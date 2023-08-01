module.exports = {
  // time in seconds of no pages generating during static
  // generation before timing out
  staticPageGenerationTimeout: 1000,
  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: '**',
          port: '',
          pathname: '**',
      },
    ],
}
}