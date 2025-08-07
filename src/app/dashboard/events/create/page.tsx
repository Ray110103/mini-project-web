import { notFound, redirect } from "next/navigation";
import CreateEvent from "./component/CreateEvent";
import { auth } from "@/auth";

const DashboardEvents = async () => {
  const session = await auth();

  if (!session?.user) return redirect(`/sign-in`);

  return <CreateEvent />;
};

export default DashboardEvents;
