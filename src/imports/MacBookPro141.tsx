import svgPaths from "./svg-urfe0siwju";
import imgHackerTroupe1 from "figma:asset/4ad2e491b496ab4d25a9d3277521d9ca4445b699.png";

function TablerSun({ className }: { className?: string }) {
  return (
    <div className={className} data-name="tabler:sun">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-3.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={svgPaths.p1f974000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[356px] top-[368px]">
      <div className="absolute h-[226px] left-[356px] top-[368px] w-[248px]" data-name="HackerTroupe 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[109.73%] left-0 max-w-none top-[-0.88%] w-full" src={imgHackerTroupe1} />
        </div>
      </div>
      <div className="absolute font-['Mokoto:Regular',sans-serif] h-[180px] leading-none left-[604px] not-italic text-[#111] text-[100px] top-[402px] w-[553px]">
        <p className="mb-0">Hacker</p>
        <p>Troupe</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents font-['Mokoto:Regular',sans-serif] leading-none left-[285px] not-italic text-[#111] text-[20px] text-nowrap top-[65px]">
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
    <div className="bg-[#f5f5f5] relative size-full" data-name="MacBook Pro 14' - 1">
      <div className="absolute h-[60px] left-[34px] top-[45px] w-[72px]" data-name="HackerTroupe 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[120.98%] left-0 max-w-none top-[-11.22%] w-full" src={imgHackerTroupe1} />
        </div>
      </div>
      <Group1 />
      <Group />
      <div className="absolute aspect-[40/40] left-[91.47%] right-[5.22%] top-[calc(50%-416px)] translate-y-[-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, #111111)" id="Ellipse 1" r="25" />
        </svg>
      </div>
      <TablerSun className="absolute left-[1388px] size-[40px] top-[55px]" />
      <p className="absolute font-['Nourd-Regular:Regular',sans-serif] leading-none left-[calc(50%+0.5px)] not-italic text-[30px] text-black text-center top-[890px] tracking-[1.5px] translate-x-[-50%] w-[787px]">{`INDEPENDENT SECURITY RESEARCH & CTF TEAM`}</p>
    </div>
  );
}