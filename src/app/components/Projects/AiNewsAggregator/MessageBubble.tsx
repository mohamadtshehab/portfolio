import { FaExternalLinkAlt } from 'react-icons/fa';

// New Message Bubble component
const MessageBubble = () => {
    return (
      <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
        {/* Date header */}
        <div className="flex justify-center my-2">
          <span className="bg-white/10 text-gray-300 px-3 py-1 text-xs rounded-full">
            Today
          </span>
        </div>
        
        {/* Message 1 */}
        <div className="bg-white/10 rounded-2xl rounded-bl-none p-4 shadow-md self-start max-w-full">
          <div className="text-white text-sm mb-2 leading-relaxed">
            • Google Research introduces LightLab, a diffusion-based AI method enabling physically plausible, fine-grained light control in single images, bypassing the need for 3D scene reconstruction.
          </div>
          <div className="text-white text-sm mb-3 leading-relaxed" dir="rtl">
            تقدم Google Research LightLab، وهي طريقة ذكاء اصطناعي قائمة على الانتشار تتيح تحكمًا دقيقًا وواقعيًا في الإضاءة في الصور الفردية، متجاوزة الحاجة إلى إعادة بناء المشهد ثلاثي الأبعاد.
          </div>
          <a 
            href="https://www.marktechpost.com/2025/05/17/google-researchers-introduce-lightlab-a-diffusion-based-ai-method-for-physically-plausible-fine-grained-light-control-in-single-images/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3e95ea] text-xs flex items-center hover:underline"
          >
            marktechpost.com <FaExternalLinkAlt className="ml-1 text-[0.6rem]" />
          </a>
          <div className="mt-2 text-right">
            <span className="text-gray-400 text-xs">{new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
          </div>
        </div>
        
        {/* Message 2 */}
        <div className="bg-white/10 rounded-2xl rounded-bl-none p-4 shadow-md self-start max-w-full">
          <div className="text-white text-sm mb-2 leading-relaxed">
            • DeepSeek-AI&apos;s paper explores DeepSeek-V3&apos;s high-performance language modeling achieved through minimizing hardware overhead and maximizing computational efficiency.
          </div>
          <div className="text-white text-sm mb-3 leading-relaxed" dir="rtl">
            تستكشف ورقة DeepSeek-AI نموذج اللغة عالي الأداء DeepSeek-V3 الذي تم تحقيقه من خلال تقليل النفقات العامة للأجهزة وزيادة الكفاءة الحسابية.
          </div>
          <a 
            href="https://www.marktechpost.com/2025/05/16/this-ai-paper-from-deepseek-ai-explores-how-deepseek-v3-delivers-high-performance-language-modeling-by-minimizing-hardware-overhead-and-maximizing-computational-efficiency/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3e95ea] text-xs flex items-center hover:underline"
          >
            marktechpost.com <FaExternalLinkAlt className="ml-1 text-[0.6rem]" />
          </a>
          <div className="mt-2 text-right">
            <span className="text-gray-400 text-xs">{new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
          </div>
        </div>
      </div>
    );
  };

  export default MessageBubble;