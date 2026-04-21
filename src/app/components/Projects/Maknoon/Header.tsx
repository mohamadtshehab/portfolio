import { Info, List } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';

type HeaderProps = {
    onToggleSidebar: () => void;
    hasFinishedReading: boolean;
    showNote?: boolean;
};

const Header = ({ onToggleSidebar, hasFinishedReading, showNote = false }: HeaderProps) => {
    const [showHint, setShowHint] = useState(false);
    const [hintMode, setHintMode] = useState<'pre' | 'post'>('pre');

    useEffect(() => {
        if (showNote) {
            setShowHint(false);
            return;
        }

        if (!hasFinishedReading) {
            setHintMode('pre');
            setShowHint(true);
        } else {
            setHintMode('post');
            setShowHint(true);
            const timeoutId = setTimeout(() => setShowHint(false), 4000);
            return () => clearTimeout(timeoutId);
        }
    }, [hasFinishedReading, showNote]);

    return (
        <header className="flex shrink-0 flex-col border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center justify-between gap-2 px-3 py-3 sm:px-6 md:px-10">
                <div>
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="rounded-md p-2 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Toggle sidebar"
                        disabled={!hasFinishedReading}
                    >
                        <List size={24} />
                    </button>
                </div>

                <h1 className="min-w-0 flex-1 text-center text-sm font-bold leading-tight sm:text-base md:text-lg">
                    The Avengers&apos; Tale
                </h1>
                <div
                    className="aspect-square size-9 shrink-0 rounded-full bg-cover bg-center bg-no-repeat sm:size-10"
                    style={{ backgroundImage: 'url("https://source.unsplash.com/random/100x100?person")' }}
                />
            </div>

            {/* In-flow hint strip: reserves space below the toolbar so the reader column stays unobstructed */}
            {showHint && (
                <button
                    type="button"
                    role="status"
                    aria-live="polite"
                    onClick={() => setShowHint(false)}
                    className="flex w-full items-start gap-3 border-t border-neutral-200/80 bg-theme-100 px-3 py-2.5 text-left text-xs leading-snug text-white transition-colors hover:bg-theme-100/95 sm:px-6 md:px-10"
                >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <Info size={14} weight="bold" className="text-white" aria-hidden />
                    </span>
                    <span className="min-w-0 pt-0.5">
                        {hintMode === 'pre' ? (
                            <>
                                <span className="font-semibold">Keep reading — </span>
                                Characters and the character network unlock after you reach the end of the story.
                            </>
                        ) : (
                            <>
                                <span className="font-semibold">Unlocked — </span>
                                Open the sidebar to explore characters and the network.
                            </>
                        )}
                    </span>
                </button>
            )}
        </header>
    );
};

export default Header;
