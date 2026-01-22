import { Apple, Play } from "lucide-react";

export function AppStoreButton() {
    return (
        <a href="#" className="btn btn-neutral bg-black text-white rounded-xl px-6 flex items-center gap-3 border-none hover:bg-zinc-800 transition-colors h-14">
            <Apple size={24} />
            <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] uppercase font-bold opacity-60 text-white">Disponible sur</span>
                <span className="text-lg font-bold text-white">App Store</span>
            </div>
        </a>
    );
}

export function PlayStoreButton() {
    return (
        <a href="#" className="btn btn-neutral bg-black text-white rounded-xl px-6 flex items-center gap-3 border-none hover:bg-zinc-800 transition-colors h-14">
            <Play size={24} fill="white" />
            <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] uppercase font-bold opacity-60 text-white">Disponible sur</span>
                <span className="text-lg font-bold text-white">Google Play</span>
            </div>
        </a>
    );
}
