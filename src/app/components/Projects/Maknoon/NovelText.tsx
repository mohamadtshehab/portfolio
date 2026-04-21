import React, { RefObject } from 'react';

const NovelText = ({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null>;  }) => {
    return (
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <div className="max-w-2xl mx-auto pb-20">
          <div className="mb-8 font-serif">
            <h3 className="text-xl font-semibold mb-3 text-center">Introduction: A Promise Under the Ashes of the Past</h3>
            <p className="text-lg leading-relaxed py-2 text-justify">
              In the autumn of their final university year, when the last dreams before graduation are woven, there was a student named Mohamad Shehab, carrying within him ambition and harsh lessons from the past. His high grade in the fourth-year project had not been enough to erase the memory of an unbalanced team where he bore the heaviest burden. So, he swore his graduation project would be different.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              It began as a quest to find five fighters ready to wage the graduation battle together, in the spirit of one team.
            </p>
          </div>

          <div className="mb-8 font-serif">
            <h3 className="text-xl font-semibold mb-3 text-center">Chapter One: The Gathering of the Avengers</h3>
            <p className="text-lg leading-relaxed py-2 text-justify">
              The pact began with two people: Mohamad Shehab and his friend Aamer Al-Sumar. They had agreed to work together, but Mohamad, who had learned from his experiences, set his conditions firmly: no leniency, no excuses, hard work was the only way. After Aamer agreed, the search for three more members began.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              A mysterious person—let&apos;s call him &quot;X&quot;—was not part of their initial plans. But when they contacted him to ask about another colleague he had worked with before, &quot;X&quot; seized the chance and convinced them that he himself was the right fit for the mission. And so, he joined them.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              The circle was completed with the addition of Rama Al-Sabbot and Tamam Mundher. But Tamam&apos;s joining was not smooth; &quot;X&quot; carried the shadows of an old, bitter experience with him. &quot;X&quot; tried to object, suggesting a four-member team would be more effective, but Mohamad and Rama&apos;s insistence settled the matter. The team was complete, and they named themselves The Avengers.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              The name was more than a slogan—it was a vow each made: to avenge past failures and create a project they could be proud of.
            </p>
          </div>

          <div className="mb-8 font-serif">
            <h3 className="text-xl font-semibold mb-3 text-center">Chapter Two: Clash of Ideas and Birth of the Dream</h3>
            <p className="text-lg leading-relaxed py-2 text-justify">
              The team&apos;s Telegram group became an arena for ideas. Many suggestions were thrown around, from turning engineering blueprints into 3D models, to building a smart parking system. But the first idea was repetitive, and the second was warned against by Professor Medhat Al-Sous, who told them it always failed.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              Amid this deadlock, Mohamad Shehab lit a candle in the darkness. He drew inspiration from his personal experience while reading Jane Eyre, where he often got lost among its many characters. He wondered: What if there were an app that could read the novel, map out its characters and their relationships, and present them to the reader without spoiling the events?
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              At first, the idea was rejected for being too bold. But when all other options fell away, it became their only lifeboat.
            </p>
          </div>

          <div className="mb-8 font-serif">
            <h3 className="text-xl font-semibold mb-3 text-center">Chapter Three: Allies in the Academy</h3>
            <p className="text-lg leading-relaxed py-2 text-justify">
              Once the team settled on their unique idea, the next step was to gain the blessing of the academic staff. Their first stop was Dr. Nada Ghoneim&apos;s office. They presented the idea with both enthusiasm and anxiety. Her response was quick and decisive—her eyes lit up with admiration and she accepted immediately, not only approving the idea but also agreeing to be their official supervisor.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              Her approval was the project&apos;s true birth certificate. From then on, her office became a regular stop where they shared updates and sought her advice and expertise.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              They did&apos; stop there. They also presented the idea to Dr. Ammar Al-Nahhas, who listened carefully and strongly encouraged them, reinforcing their confidence that they were on the right track.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              Feeling the need for technical engineering supervision, they approached Engineer Omar Hadeed, who agreed to guide them on the practical details throughout the journey. Thus, their support network was complete, with strong allies inside the college walls.
            </p>
          </div>

          <div className="mb-8 font-serif">
            <h3 className="text-xl font-semibold mb-3 text-center">Chapter Four: The First Rift… and a Mask Falls</h3>
            <p className="text-lg leading-relaxed py-2 text-justify">
              As work began, masks started to fall. &quot;X,&quot; who was supposed to be the team&apos;s technical pillar, began building walls around his work. He acted as if the project&apos;s frontend was his private kingdom, off-limits to others&apos; input. His arrogance and superiority clashed repeatedly with the team spirit Mohamad tried to foster.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              The conflict peaked during another course&apos;s project, when a technical discussion turned personal. &quot;X&quot; couldn&apos;t handle criticism of his work. After a heated argument with Mohamad, and harsh words directed at Rama, he quit in dramatic fashion—leaving behind a void and confusion.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              His departure was painful, but it felt like necessary surgery to remove a tumor threatening the team&apos;s body as a whole.
            </p>
          </div>

          <div className="mb-8 font-serif">
            <h3 className="text-xl font-semibold mb-3 text-center">Chapter Five: A Blow of Fate… and Bitter Disappointment</h3>
            <p className="text-lg leading-relaxed py-2 text-justify">
              The now four-member team had barely recovered from the first shock when an even harsher blow struck. The news came like thunder: Aamer Al-Sumar, Mohamad&apos;s first ally, had failed his fourth year. By law, he could no longer continue the project.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              Aamer promised to stay and support the team to the end, insisting it was his mistake alone and that he wouldn&apos;t abandon them. But his promises evaporated with time. He became a ghost, appearing and disappearing, traveling for months without warning, leaving his tasks unfinished.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              Mohamad tried everything, even offering him money to finish his part, but to no avail. The disappointment was especially bitter because it came from a friend. Finally, in a moment of despair and resolve, Mohamad confronted him and formally ended his role in the project.
            </p>
          </div>

          <div className="mb-8 font-serif">
            <h3 className="text-xl font-semibold mb-3 text-center">Chapter Six: Three Against the Storm</h3>
            <p className="text-lg leading-relaxed py-2 text-justify">
              And so, just weeks before the deadline, Mohamad Shehab found himself in the eye of the storm. The team that began with five Avengers was now only three: Mohamad, Rama Al-Sabbot, and Tamam Mundher.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              Mohamad had to shoulder the entire backend, along with developing the most complex part of the AI system. The days were brutal, made worse when Rama and Tamam were forced to stop working for weeks due to events in their city, leaving Mohamad completely alone with the massive project.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              But they didn&apos;t give up. They came back stronger and united. They worked day and night, tied the scattered threads, and rebuilt what had collapsed. Rama returned to frontend with determination, while Mohamad and Tamam refined every detail of the system and the report.
            </p>
            <p className="text-lg leading-relaxed py-2 text-justify">
              Today, these three stand at the finish line. They are no longer just students about to graduate, but warriors worn down by battle who nevertheless were not defeated. Their project is no longer just a smart application, but a testament to their resilience—a story of a team that nearly sank, but survived thanks to the will of three Avengers who refused to abandon the dream.
            </p>
          </div>
        </div>
      </main>
    );
  };
  
  export default NovelText;