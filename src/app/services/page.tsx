export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description: "Modern web applications using latest technologies",
      iconPath: "M10 20l4-16m4 16l4-16M6 9h12v2H6V9z",
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform mobile solutions",
      iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    },
    {
      title: "Backend Services",
      description: "Scalable API development & database design",
      iconPath: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    },
    {
      title: "Full-Stack Solutions",
      description: "End-to-end product development",
      iconPath: "M9 17V7m0 10a2 2 0 002 2h6a2 2 0 002-2M9 7a2 2 0 002-2h6a2 2 0 002 2m0 10V7",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-5xl font-bold text-neon-blue text-center text-glow mb-6 animate-pulse">
        What I Offer
      </h1>
      <p className="text-stars-200 text-center mb-12">
        Comprehensive digital solutions tailored to your business needs
      </p>

      {/* Horizontal Scroll Cards */}
      <div className="flex space-x-6 overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-cosmic-blue/50 scrollbar-track-space-800">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="min-w-[350px] flex-shrink-0 glass-panel p-6 rounded-2xl 
                       bg-gradient-to-br from-space-800 via-space-700 to-space-800
                       shadow-lg shadow-neon-blue/20 hover:shadow-neon-blue/50 
                       transition-transform duration-300 hover:scale-105"
          >
            {/* Icon (Already adjusted in previous request) */}
            <div className="w-12 h-12 bg-space-700 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-1.5 h-1.5 text-neon-blue" 
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={service.iconPath}
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-neon-blue text-glow mb-2">
              {service.title}
            </h2>

            {/* Description */}
            <p className="text-stars-200 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}