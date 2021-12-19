const { google } = require("googleapis");
const moment = require("moment");
const { getYoutubeLink } = require("../../../utils/string.util");

module.exports = {
  async findLatestUpdates(ctx, next) {
    // Get Google Credential
    const credentials = JSON.parse(process.env.GOOGLE_AUTH);

    // Google Auth
    const client = await google.auth.getClient({
      credentials: {
        ...credentials,
        private_key: credentials.private_key.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.events",
        "https://www.googleapis.com/auth/calendar.events.readonly",
        "https://www.googleapis.com/auth/calendar.readonly",
      ],
    });

    // Calendar
    const calendar = await google.calendar({
      version: "v3",
      auth: client,
    });

    // Events
    const {
      data: { items: events },
    } = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: moment().subtract(1, "months").startOf("month").utc().format(),
      timeMax: moment().endOf("month").utc().format(),
    });

    // Filter events with specific content
    const filteredEvents = events
      .map((event) => {
        const youtube = getYoutubeLink(event.description || "");

        return {
          title: event.summary,
          start: event.start,
          end: event.end,
          youtube,
        };
      })
      .filter((event) => event.youtube);

    return { events: filteredEvents };
  },
};
