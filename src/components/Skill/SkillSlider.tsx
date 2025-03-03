import React from "react";
import { Slider } from "@material-tailwind/react";
import { SkillData } from "./SkillData"; // Import dataset

const SkillSliders: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto p-3 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-amber-700">SKILLS</h2>
            {SkillData.categories.map((skill, index) => (
                <div key={index} className="p-1">
                    <div className="text-left">
                    <label className="block text-gray-700 font-semibold mb-1">
                        {skill.name} ({skill.description})
                    </label>
                    </div>
                    <Slider defaultValue={skill.value} min={0} max={100} size="sm" color="amber" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                </div>
            ))}
        </div>
    );
};

export default SkillSliders;
