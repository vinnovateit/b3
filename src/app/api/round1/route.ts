import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { Round1Schema } from "@/app/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = Round1Schema.parse(body);

    const client = await clientPromise;
    const db = client.db("hackathon");
    const teams = db.collection("teams");

    const existingTeam = await teams.findOne({
      team_name: data.team_name,
    });

    if (existingTeam) {
      return NextResponse.json(
        { error: "Team name already registered" },
        { status: 409 }
      );
    }

    await teams.insertOne({
      team_name: data.team_name,
      project_title: data.project_title,
      project_description_r1: data.project_description,
      tech_stack: data.tech_stack,
      github_link_r1: data.github_link,
      figma_link: data.figma_link ?? null,

      round: 1,
      round2: {
        project_description: null,
        github_link: null,
        deployment_link: null,
      },

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Team registered successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}

