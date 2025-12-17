import svgPaths from "./svg-yi7j5l2mk";
import imgHackerTroupe1 from "figma:asset/b6613b7c92c6ffce73e045cf19781fefd75981b8.png";

function TablerMoon({ className }: { className?: string }) {
  return (
    <div className={className} data-name="tabler:moon">
      <div className="absolute inset-[12.47%_15.36%_12.53%_12.51%]" data-name="Vector">
        <div className="absolute inset-[-3.33%_-3.47%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 32">
            <path d={svgPaths.p36a99c80} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[356px] top-[374px]">
      <div className="absolute h-[220px] left-[356px] top-[374px] w-[248px]" data-name="HackerTroupe 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[112.73%] left-0 max-w-none top-[-3.64%] w-full" src={imgHackerTroupe1} />
        </div>
      </div>
      <div className="absolute font-['Mokoto:Regular',sans-serif] h-[180px] leading-none left-[604px] not-italic text-[#00e5ff] text-[100px] top-[402px] w-[553px]">
        <p className="mb-0">Hacker</p>
        <p>Troupe</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents font-['Mokoto:Regular',sans-serif] leading-none left-[285px] not-italic text-[#00e5ff] text-[20px] text-nowrap top-[65px]">
      <p className="absolute left-[285px] top-[65px]">Home</p>
      <p className="absolute left-[1137px] top-[65px]">Posts</p>
      <p className="absolute left-[625px] top-[65px]">Members</p>
      <p className="absolute left-[446px] top-[65px]">About</p>
      <p className="absolute left-[842px] top-[65px]">Achievements</p>
    </div>
  );
}

export default function MacBookPro() {
  return (
    <div className="bg-[#111] relative size-full" data-name="MacBook Pro 14' - 2">
      <div className="absolute h-[60px] left-[34px] top-[45px] w-[72px]" data-name="HackerTroupe 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[120.98%] left-0 max-w-none top-[-11.22%] w-full" src={imgHackerTroupe1} />
        </div>
      </div>
      <Group1 />
      <Group />
      <div className="absolute aspect-[40/40] left-[92.99%] right-[3.7%] top-[calc(50%-416px)] translate-y-[-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, #00E5FF)" id="Ellipse 1" r="25" />
        </svg>
      </div>
      <TablerMoon className="absolute left-[1411px] size-[40px] top-[55px]" />
      <p className="absolute font-['Nourd-Regular:Regular',sans-serif] leading-none left-[calc(50%+0.5px)] not-italic text-[#00e5ff] text-[30px] text-center top-[897px] tracking-[1.5px] translate-x-[-50%] w-[787px]">{`INDEPENDENT SECURITY RESEARCH & CTF TEAM`}</p>
    </div>
  );
}