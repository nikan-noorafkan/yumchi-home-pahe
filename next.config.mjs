const isGithubActions = process.env.GITHUB_ACTIONS === "true"
const repository = process.env.GITHUB_REPOSITORY ?? "nikan-noorafkan/yumchi-home-pahe"
const repoName = repository.split("/")[1]

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isGithubActions
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
}

export default nextConfig
