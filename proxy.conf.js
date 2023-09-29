const proxyConfig = {
  '/**': {
    "secure": false,
    "bypass": (req, res, proxyOptions) => {
      if (res) {
        res.setHeader("X-Frame-Options", "SAMEORIGIN");
      }
    }
  }
};

module.exports = proxyConfig;
