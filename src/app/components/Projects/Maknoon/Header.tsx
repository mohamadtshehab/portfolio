import { List } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';

type HeaderProps = {
    onToggleSidebar: () => void;
    hasFinishedReading: boolean;
};

const Header = ({ onToggleSidebar, hasFinishedReading }: HeaderProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipMode, setTooltipMode] = useState<'pre' | 'post'>('pre');

    useEffect(() => {
        if (!hasFinishedReading) {
            setTooltipMode('pre');
            setShowTooltip(true);
        } else {
            setTooltipMode('post');
            setShowTooltip(true);
            const timeoutId = setTimeout(() => setShowTooltip(false), 4000);
            return () => clearTimeout(timeoutId);
        }
    }, [hasFinishedReading]);

    return (
        <header className="flex-shrink-0 flex items-center justify-between whitespace-nowrap border-b border-neutral-200 px-10 py-3">
            <div className="relative group">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 rounded-md hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Toggle sidebar"
                    disabled={!hasFinishedReading}
                >
                    <List size={24} />
                </button>

                {showTooltip && (
                    <div
                        onClick={() => setShowTooltip(false)}
                        // 👇 MODIFIED: Removed vertical centering and aligned to the top of the button's container.
                        className="absolute left-full top-0 z-10 w-72 rounded-lg bg-neutral-800 text-white text-xs px-4 py-3 shadow-lg cursor-pointer whitespace-normal break-words"
                    >
                        {tooltipMode === 'pre' ? (
                            <>
                                <p className="font-semibold mb-1">Keep reading 📖</p>
                                <p>Characters and the character network unlock after you finish the story.</p>
                            </>
                        ) : (
                            <>
                                <p className="font-semibold mb-1">Unlocked 🎉</p>
                                <p>You can now open the sidebar to explore characters and the network.</p>
                            </>
                        )}
                        {/* 👇 MODIFIED: Repositioned arrow from the vertical middle to the top. */}
                        <div className="absolute top-3.5 -left-1 w-3 h-3 bg-neutral-800 rotate-45" />
                    </div>
                )}
            </div>

            <h1 className="text-lg font-bold">The Avengers&apos; Tale</h1>
            <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{ backgroundImage: 'url("https://source.unsplash.com/random/100x100?person")' }}
            />
        </header>
    );
};

export default Header;