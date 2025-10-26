
export default function LoadingSpinner(){
    return (
    <div className="flex justify-center items-center align-middle p-8">
        <div className="w-[60px] h-[60px] border-[5px] border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
    </div>
    );
}