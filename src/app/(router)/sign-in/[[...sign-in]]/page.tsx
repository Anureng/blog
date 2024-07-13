import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="border border-black flex items-center justify-center ">
            <SignUp />;
        </div>
    )
}