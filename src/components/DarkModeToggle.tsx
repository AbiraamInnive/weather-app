"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDark]);

    return (
        <div className="flex items-center gap-3 text-sm font-medium">
            <Sun className="w-5 h-5 text-purple-500" />
            <span className={`${!isDark ? "text-gray-500" : "text-purple-600"}`}>Light</span>

            <button
                onClick={() => setIsDark(!isDark)}
                aria-label="Toggle dark mode"
                className={`cursor-pointer relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isDark ? "bg-purple-600" : "bg-gray-300"
                    }`}
            >
                <span
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isDark ? "translate-x-6" : "translate-x-0"
                        }`}
                ></span>
            </button>

            <span className={`${isDark ? "text-purple-600" : "text-gray-500"}`}>Dark</span>
            <Moon className="w-5 h-5 text-yellow-400" />
        </div>
    );
}
