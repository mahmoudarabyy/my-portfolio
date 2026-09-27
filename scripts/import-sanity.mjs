import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { localProjects } from "../lib/local-projects.mjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (
  !projectId ||
  !dataset ||
  !token ||
  !/^[a-z0-9]+$/.test(projectId) ||
  !/^[a-z0-9_-]+$/.test(dataset)
) {
  console.error(
    "Set the Sanity project ID, dataset and a temporary Editor token in .env.local before importing.",
  );
  process.exit(1);
}
const base = `https://${projectId}.api.sanity.io/v2025-02-19`;
const root = fileURLToPath(new URL("../public/", import.meta.url));
const uploads = new Map();
async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...options.headers },
    signal: AbortSignal.timeout(120000),
  });
  if (!response.ok)
    throw new Error(
      `Sanity request failed (${response.status}). Check dataset permissions and token.`,
    );
  return response.json();
}
async function image(src) {
  if (!src) return undefined;
  if (uploads.has(src)) return uploads.get(src);
  if (!src.startsWith("/"))
    throw new Error("The initial import expects local images only.");
  const file = path.resolve(root, "." + src);
  if (!file.startsWith(path.resolve(root) + path.sep))
    throw new Error("Image outside public/.");
  const types = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".avif": "image/avif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
  };
  const result = await request(
    `${base}/assets/images/${dataset}?filename=${encodeURIComponent(path.basename(file))}`,
    {
      method: "POST",
      headers: {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
      },
      body: await readFile(file),
    },
  );
  const value = {
    _type: "image",
    asset: { _type: "reference", _ref: result.document._id },
  };
  uploads.set(src, value);
  return value;
}
try {
  const query = encodeURIComponent('*[_type == "project"]._id');
  const existing = new Set(
    (await request(`${base}/data/query/${dataset}?query=${query}`)).result,
  );
  for (const project of localProjects) {
    const id = `project-${project.id}`;
    if (existing.has(id) || existing.has(`drafts.${id}`)) {
      console.log(`Skipped existing project: ${project.id}`);
      continue;
    }
    const {
      id: slug,
      gallery,
      icon,
      cardImage,
      coverImage,
      aboutImg,
      researchImg,
      problemImg,
      solutionImg,
      nextId,
      nextTitle,
      categoryKey,
      title,
      category,
      ...fields
    } = project;
    const doc = {
      ...fields,
      _id: id,
      _type: "project",
      slug: { _type: "slug", current: slug },
    };
    for (const [key, src] of Object.entries({
      icon,
      cardImage,
      coverImage,
      aboutImg,
      researchImg,
      problemImg,
      solutionImg,
    })) {
      if (src) doc[key] = await image(src);
    }
    doc.gallery = [];
    for (const [index, src] of gallery.entries())
      doc.gallery.push({ ...(await image(src)), _key: `image-${index}` });
    await request(`${base}/data/mutate/${dataset}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mutations: [{ createIfNotExists: doc }] }),
    });
    console.log(`Imported: ${slug}`);
  }
  console.log(
    "Import complete. Existing projects were preserved. Remove the temporary write token from .env.local.",
  );
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
