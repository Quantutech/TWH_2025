import Layout from "../../components/layout/Layout";
import Link from "next/link";

export default function Unauthorized() {
    return (
        <Layout
            mainContainerProps={{ padding: "0px" }}
            childrenContainerProps={{ maxWidth: "auto", className: "text-center py-20" }}
        >
            <div className="flex flex-col items-center justify-center space-y-6">
                <h1 className="text-4xl font-bold text-red-600">You do not have permissionk</h1>
                <p className="text-lg text-gray-600">
                    You do not have permission to access this page. Please make sure you are logged in with the correct account.
                </p>
                <Link href="/">
                    <button>Return Back</button>
                </Link>
            </div>
        </Layout>
    );
}
