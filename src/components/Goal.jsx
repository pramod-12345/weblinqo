import { motion } from 'framer-motion';

const Goal = ({ goal, setGoal, saving }) => {
  const goals = [
    {
      value: "CREATOR",
      title: "I'm a Creator",
      description: "Grow my audience and monetize my content"
    },
    {
      value: "BUSINESS",
      title: "I'm a Business",
      description: "Promote my products and services"
    },
    {
      value: "PERSONAL",
      title: "Personal Use",
      description: "Share my links with friends and community"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-gray-600 text-center">
          This helps us personalize your weblinqo experience
        </p>
      </div>

      <div className="space-y-3">
        {goals.map((item) => (
          <motion.button
            key={item.value}
            whileTap={{ scale: 0.98 }}
            onClick={() => !saving && setGoal(item.value)}
            disabled={saving}
            className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
              goal === item.value
                ? "border-[#c4ff4d] bg-[#f8faf3]"
                : "border-gray-200 hover:border-[#c4ff4d]/50 hover:bg-[#f8faf3]/50"
            } ${saving ? "opacity-70 cursor-not-allowed" : ""}`}
            type="button"
          >
            <h2 className="font-semibold text-gray-900">{item.title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {item.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Goal;