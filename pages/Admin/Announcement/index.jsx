import React from "react";
import { prisma } from "../../../util/db.server";
import { getSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from "../../../components/common/MainHeader";
import AddAnnouncement from "../../../components/Admin/announcement/AddAnnouncement";
import { DisplayAnnouncement } from "../../../components/Admin/announcement/DisplayAnnouncement";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;
  console.log(session)
  if (userRole !== "admin") {
    return {
      redirect: { destination: "/auth/Admin/Login/signin-user", permanent: false },
    };
  }

  const announcements = await prisma.Announcement.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  const allAnnouncements = announcements.map((ann) => ({
    id: ann.id,
    title: ann.title,
    content: ann.content,
    createdAt: ann.createdAt,
    author: ann.author.name,
  }));

  return { props: { announcements: JSON.parse(JSON.stringify(allAnnouncements)), userId: session.user.user_id } };
}

export default function AnnouncementPage({ announcements, userId }) {
  const refresh = async () => {
    // For simplicity, reload page
    window.location.reload();
  };

  return (
    <React.Fragment>
      <MainHeader title="Admin Dashboard - Announcements" />
      <section className="flex flex-col w-full h-full bg-gray-100 pt-24">
        <div className="flex w-full">
          <VerticalNavbar />
          <div className="w-full lg:px-6">
            <AddAnnouncement authorId={userId} refresh={refresh} />
            <DisplayAnnouncement announcements={announcements} refresh={refresh} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
