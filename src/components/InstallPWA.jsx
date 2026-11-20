import { useEffect, useState } from "react";

const InstallPWA = () => {
   const [prompt, setPrompt] = useState(null);
   const [dismissed, setDismissed] = useState(() => localStorage.getItem("pwa-install-dismissed") === "1");

   useEffect(() => {
      const onPrompt = (e) => {
         e.preventDefault();
         setPrompt(e);
      };
      const onInstalled = () => setPrompt(null);
      window.addEventListener("beforeinstallprompt", onPrompt);
      window.addEventListener("appinstalled", onInstalled);
      return () => {
         window.removeEventListener("beforeinstallprompt", onPrompt);
         window.removeEventListener("appinstalled", onInstalled);
      };
   }, []);

   if (!prompt || dismissed) return null;

   const install = async () => {
      prompt.prompt();
      await prompt.userChoice;
      setPrompt(null);
   };

   const dismiss = () => {
      localStorage.setItem("pwa-install-dismissed", "1");
      setDismissed(true);
   };

   return (
      <div className="container mx-auto mb-5">
         <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="flex-none text-slate-600 dark:text-slate-300" viewBox="0 0 16 16">
               <path d="M7.5 1.5a.5.5 0 0 1 1 0v6.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 8.293z" />
               <path d="M2 13.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
            </svg>
            <div className="min-w-0 flex-1">
               <p className="text-sm font-semibold">Install Al Qur'an</p>
               <p className="text-xs text-slate-500 dark:text-slate-400">Akses lebih cepat dan bisa dibaca offline.</p>
            </div>
            <button
               type="button"
               onClick={install}
               className="flex-none rounded-lg bg-linear-to-r from-slate-800 to-slate-700 px-3 py-1.5 text-xs text-white hover:from-slate-900 hover:to-slate-800"
            >
               Install
            </button>
            <button type="button" onClick={dismiss} aria-label="Tutup tawaran install" className="flex-none p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
               </svg>
            </button>
         </div>
      </div>
   );
};

export default InstallPWA;
