import prismadb from "@/lib/prismadb";
import { NextPage } from "next";

interface DashboardPageProps {
    params: {
        storeId: string;
    };
}

const DashboardPage: NextPage<DashboardPageProps> = async ({ params }) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
    });
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Store: {store?.name}</p>
        </div>
    );
};

export default DashboardPage;
