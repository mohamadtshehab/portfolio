import { List } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';

type HeaderProps = {
    onToggleSidebar: () => void;
    hasFinishedReading: boolean;
    showNote?: boolean;
};

const Header = ({ onToggleSidebar, hasFinishedReading, showNote = false }: HeaderProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipMode, setTooltipMode] = useState<'pre' | 'post'>('pre');

    useEffect(() => {
        // Don't show tooltips if the note is still visible
        if (showNote) {
            setShowTooltip(false);
            return;
        }
        
        if (!hasFinishedReading) {
            setTooltipMode('pre');
            setShowTooltip(true);
        } else {
            setTooltipMode('post');
            setShowTooltip(true);
            const timeoutId = setTimeout(() => setShowTooltip(false), 4000);
            return () => clearTimeout(timeoutId);
        }
    }, [hasFinishedReading, showNote]);

    return (
        <header className="flex shrink-0 items-center justify-between gap-2 border-b border-neutral-200 px-3 py-3 sm:px-6 md:px-10">
            <div className="relative group">
                <button
                    onClick={onToggleSidebar}
                    className="rounded-md p-2 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Toggle sidebar"
                    disabled={!hasFinishedReading}
                >
                    <List size={24} />
                </button>

                {showTooltip && (
                    <div
                        onClick={() => setShowTooltip(false)}
                        className="absolute left-1/2 top-full z-10 mt-2 w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 cursor-pointer rounded-lg bg-theme-100 px-4 py-3 text-xs text-white shadow-lg sm:left-full sm:top-0 sm:ml-3 sm:mt-0 sm:w-72 sm:translate-x-0 sm:translate-y-0"
                    >
                        {tooltipMode === 'pre' ? (
                            <>
                                <p className="mb-1 font-semibold">Keep reading 📖</p>
                                <p>Characters and the character network unlock after you finish the story.</p>
                            </>
                        ) : (
                            <>
                                <p className="mb-1 font-semibold">Unlocked 🎉</p>
                                <p>You can now open the sidebar to explore characters and the network.</p>
                            </>
                        )}
                        <div className="absolute -top-1.5 left-1/2 hidden h-3 w-3 -translate-x-1/2 rotate-45 bg-theme-100 sm:left-3 sm:top-3.5 sm:block sm:translate-x-0" />
                    </div>
                )}
            </div>

            <h1 className="min-w-0 flex-1 text-center text-sm font-bold leading-tight sm:text-base md:text-lg">
                The Avengers&apos; Tale
            </h1>
            <div
                className="aspect-square size-9 shrink-0 rounded-full bg-cover bg-center bg-no-repeat sm:size-10"
                style={{ backgroundImage: 'url("https://source.unsplash.com/random/100x100?person")' }}
            />
        </header>
    );
};

export default Header;