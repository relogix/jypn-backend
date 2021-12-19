module.exports = {
  routes: [
    {
      method: "GET",
      path: "/updates/latest",
      handler: "updates.findLatestUpdates",
      config: {
        auth: false,
      },
    },
  ],
};
