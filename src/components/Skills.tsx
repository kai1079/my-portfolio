// // components/Skills.tsx
// export const Skills: React.FC = () => (
//     <section className="max-w-6xl mx-auto px-12 py-16 text-center relative">
//       <h2 className="text-4xl font-bold text-white mb-8">My Skills</h2>
//       <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {[
//           { name: "Python", icon: "/src/assets/icons/python.png" },
//           { name: "Git Source Control", icon: "/src/assets/icons/git.png" },
//           { name: "C#", icon: "/src/assets/icons/dotnet.png" },
//           { name: "Java", icon: "/src/assets/icons/java.png" },
//           { name: "Database", icon: "/src/assets/icons/mysql.png" },
//           { name: "AWS Server", icon: "/src/assets/icons/aws.png" },
//         ].map((skill, index) => (
//           <div key={index} className="bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-yellow-500 transition duration-300">
//             <img src={skill.icon} alt={skill.name} className="w-12 h-12 mb-3" />
//             <span className="text-white font-medium">{skill.name}</span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );

// components/Skills.tsx
// export const Skills: React.FC = () => (
//   <section className="max-w-6xl mx-auto px-12 py-16 text-center relative">
//     <h2 className="text-4xl font-bold text-black mb-8">SKILLS</h2>
//     <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//       {[
//         { name: "Python", icons: ["/src/assets/icons/python.png"] },
//         { name: "C# & .Net Core", icons: ["/src/assets/icons/dotnet.png"] },
//         { name: "Java", icons: ["/src/assets/icons/java.png", "/src/assets/icons/spring.png"] },
//         { name: "Git Source Control", icons: ["/src/assets/icons/git.png"] },
//         { name: "Database", icons: ["/src/assets/icons/mysql.png", "/src/assets/icons/postgresql.png", "/src/assets/icons/redis.png"] },
//         { name: "React & Typescript", icons: ["/src/assets/icons/react.png", "/src/assets/icons/typescript.png"] },
//         { name: "Cloud", icons: ["/src/assets/icons/aws.png", "/src/assets/icons/azure.png"] },
//         { name: "Containerzied", icons: ["/src/assets/icons/kubernetes.png", "/src/assets/icons/docker.png"]},
//         { name: "Messaging system", icons: ["/src/assets/icons/kafka.png", "/src/assets/icons/rabbitmq.png"] },
//         { name: "CI/CD", icons: ["/src/assets/icons/gocd.svg", "/src/assets/icons/buildkite.png", "/src/assets/icons/jenkin.png"] },
//       ].map((skill, index) => (
//         <div key={index} className="bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-yellow-500 transition duration-300">
//           <div className="flex space-x-2 justify-center">
//             {skill.icons.map((icon, i) => (
//               <img key={i} src={icon} alt={skill.name} className="w-12 h-12 mb-3" />
//             ))}
//           </div>
//           <span className="text-black font-medium">{skill.name}</span>
//         </div>
//       ))}
//     </div>
//   </section>
// );
export const Skills: React.FC = () => (
    <section className="max-w-6xl mx-auto px-12 py-16 text-center relative">
      {/* Two identical lines before h2 */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-24 h-0.5 bg-yellow-500"></div>
        {/* <div className="border-t-2 border-yellow-500 w-12 mb-4"></div> */}
        <h2 className="text-4xl font-bold text-black mx-4">SKILLS</h2>
        <div className="w-24 h-0.5 bg-yellow-500"></div>
      </div>
  
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[
          { name: "Python", icons: ["/src/assets/icons/python.png"] },
          { name: "C# & .Net Core", icons: ["/src/assets/icons/dotnet.png"] },
          { name: "Java", icons: ["/src/assets/icons/java.png", "/src/assets/icons/spring.png"] },
          { name: "Git Source Control", icons: ["/src/assets/icons/git.png"] },
          { name: "Database", icons: ["/src/assets/icons/mysql.png", "/src/assets/icons/postgresql.png", "/src/assets/icons/redis.png"] },
          { name: "React & Typescript", icons: ["/src/assets/icons/react.png", "/src/assets/icons/typescript.png"] },
          { name: "Cloud", icons: ["/src/assets/icons/aws.png", "/src/assets/icons/azure.png"] },
          { name: "Containerized", icons: ["/src/assets/icons/kubernetes.png", "/src/assets/icons/docker.png"]},
          { name: "Messaging system", icons: ["/src/assets/icons/kafka.png", "/src/assets/icons/rabbitmq.png"] },
          { name: "CI/CD", icons: ["/src/assets/icons/gocd.svg", "/src/assets/icons/buildkite.png", "/src/assets/icons/jenkin.png"] },
        ].map((skill, index) => (
          <div key={index} className="bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-yellow-500 transition duration-300">
            <div className="flex space-x-2 justify-center">
              {skill.icons.map((icon, i) => (
                <img key={i} src={icon} alt={skill.name} className="w-12 h-12 mb-3" />
              ))}
            </div>
            <span className="text-black font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
  

