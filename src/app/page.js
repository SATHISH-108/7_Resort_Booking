import { redirect } from "next/navigation";
import { auth } from "./auth";
import DBConnection from "./utils/configure/db";
import { signOut, signIn } from "./auth";
import UserNavigation from "./components/UserNavigation";
import Admin from "@/app/admin/page";
import ProductCollection from "./components/ProductCollection";

const HomePage = async () => {
  const session = await auth();
  // console.log("homepage-session", session);
  // { user: { name: 'sathish', email: 'sathish91577@gmail.com' },   expires: '2025-03-21T13:11:51.705Z',
  //   userId: 'e93dac6b-cb02-4d33-83c5-bd6e1733e2c0',  username: 'sathish',   role: 'user', email: 'sathish91577@gmail.com'
  // }

  //  {
  //     user: { name: 'admin', email: 'admin@resort.com' },expires: '2025-03-21T13:20:04.907Z',
  //     userId: '0b4bbc44-57b2-408a-8f1c-bc7c3df14feb',username: 'admin', role: 'admin', email: 'admin@resort.com'
  //   }
  await DBConnection();
  if (!session) {
    redirect("/login");
  }
  const { username, name, email, userId, role } = session;
  return (
    <div>
      {session.role === "user" && (
        <>
          <UserNavigation username={username} />
          <ProductCollection />
        </>
      )}
      {session.role === "admin" && <Admin />}
    </div>
  );
};

export default HomePage;
