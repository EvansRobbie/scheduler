import axios from "axios";
import { google } from "googleapis";
import type { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  console.log(session?.user.accessToken);
  //   if (!session) {
  //     res.status(401);
  //   }
  const data = await req.json();
  const startDateTime = new Date(data.startDate);
  const endDateTime = new Date(data.endDate);
  console.log("data", data);

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  //   const accessToken = session?.accessToken;
  //   const refreshToken = session?.refreshToken;

  const auth = new google.auth.OAuth2({
    clientId,
    clientSecret,
  });
  auth.setCredentials({
    // access_token: accessToken,
    // refresh_token: refreshToken,
  });

  const calendar = google.calendar({ auth, version: "v3" });
  try {
    const event = {
      summary: data.summary,
      description: data.description,
      attendees: [{ email: "evansrobbie5311@gmail.com" }],
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      conferenceData: {
        createRequest: {
          requestId: "sample123",
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };
    const response = await axios.post(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
      event,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Error fetching events" },
      { status: 500 }
    );
  }
};
