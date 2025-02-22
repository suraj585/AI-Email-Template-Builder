import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain } from "lucide-react";
import AIInputBox from "@/components/custom/AIInputBox";

function Create() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 px-10 md:px-28 lg:px-64 xl:px-72 pt-20 overflow-hidden">
      <div className="flex items-center flex-col text-center relative">
        {/* Animated Title with Glow */}
        <h2 className="font-extrabold text-4xl md:text-6xl text-white mb-4 animate-bounce-in tracking-tight drop-shadow-lg">
          CREATE NEW EMAIL TEMPLATE
          <span className="absolute -top-2 -right-2 h-3 w-3 bg-yellow-300 rounded-full animate-ping"></span>
        </h2>
        <p className="text-lg md:text-2xl text-white/90 max-w-2xl animate-fade-in-up font-medium">
          Effortlessly design and customize professional AI-powered email
          templates with ease.
        </p>

        {/* Fancy Tabs */}
        <Tabs defaultValue="AI" className="w-full max-w-[600px] mt-12 z-10">
          <TabsList className="bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-white/20">
            <TabsTrigger
              value="AI"
              className="flex items-center gap-2 text-indigo-700 font-semibold data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-900 rounded-full px-5 py-2.5 transition-all duration-300 hover:bg-indigo-50 hover:scale-105"
            >
              Create with AI
              <Brain className="h-6 w-6 text-indigo-600 animate-spin-slow" />
            </TabsTrigger>
            <TabsTrigger
              value="SCRATCH"
              className="text-gray-700 font-semibold data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 rounded-full px-5 py-2.5 transition-all duration-300 hover:bg-gray-100 hover:scale-105"
            >
              Start from Scratch
            </TabsTrigger>
          </TabsList>

          {/* Tab Content with Enhanced Animation */}
          <TabsContent value="AI" className="mt-8 animate-slide-in-up">
            <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/30">
              <AIInputBox />
            </div>
          </TabsContent>
          <TabsContent value="SCRATCH" className="mt-8 animate-slide-in-up">
            <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 text-gray-700">
              Start building your email template from scratch here. (Coming
              soon!)
            </div>
          </TabsContent>
        </Tabs>

        {/* Decorative Background Element */}
        <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-indigo-300 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -top-20 -right-20 h-60 w-60 bg-pink-300 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
      </div>
    </div>
  );
}

export default Create;
