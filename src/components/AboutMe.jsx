import creativity from "../assets/creativity.png";
import problemSolving from "../assets/problem-solving.png";
import teamwork from "../assets/support.png";
import adaptability from "../assets/adaptation.png";

const Card = ({ skills }) => {
  return (
    <div className="max-w-8xl w-full mt-10 px-16 h-96">
      <ul className="grid grid-cols-4 gap-14">
        {skills.map((item, index) => (
          <li
            className={`bg-aquamarine-900 text-aquamarine-200 border border-aquamarine-600 h-80 flex flex-col justify-start items-start   hover:bg-aquamarine-800 transform transition hover:scale-105 p-6 rounded-xl hover:shadow-lg hover:rotate-0 hover:text-aquamarine-400
                    ${
                      index % 2 === 0
                        ? "translate-y-6 -rotate-6"
                        : "-translate-y-6 rotate-3"
                    }`}
            key={item.name}
          >
            <img
              src={`${item.icon}`}
              alt={`${item.name}`}
              className={`w-16  p-3 rounded-md bg-aquamarine-900`}
            />
            <div className="text-xl font-mono">{item.name}</div>
            <div className="text-aquamarine-200 text-sm mt-2">
              {skills[index].content}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function AboutMe() {
  const skills = [
    {
      name: "Creative Thinking",
      icon: creativity,
      content: "I enjoy creating innovative solutions that make a difference.",
    },
    {
      name: "Problem Solving",
      icon: problemSolving,
      content:
        "I thrive on tackling complex challenges and finding effective solutions.",
    },
    {
      name: "Teamwork",
      icon: teamwork,
      content:
        "I believe in the power of collaboration and enjoy working in diverse teams.",
    },
    {
      name: "Adaptability",
      icon: adaptability,
      content: "I adapt quickly to new technologies and environments.",
    },
  ];

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-aquamarine-950 to-aquamarine-800 flex flex-col justify-start items-start py-36 px-20 shadow-[0_-20px_60px_rgba(0,0,0,0.4)]">
        <div className="absolute top-20 right-20 w-[350px] h-[350px] bg-aquamarine-500/10 rounded-full blur-[120px]" />

        <h2 className="text-6xl font-mono relative z-10">
          <span className="text-white">About</span>
          <span className="text-aquamarine-500"> Me</span>
        </h2>

        <div className="text-aquamarine-300 font-mono text-3xl py-10 max-w-3xl leading-relaxed relative z-10">
          <p>
            Hello! I'm a passionate backend developer with experience in
            building.
          </p>
        </div>
        <Card skills={skills} />
      </div>
    </>
  );
}
