import banner from "../../assets/banner.png"
import {motion} from "framer-motion";

const Banner2 = () => {
  return (
   <section>

    <div className="container py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
         {/* Banner Text */}
         <motion.div
         initial={{ opacity:0, x: -100}}
         whileInView={{ opacity: 1, x:0}}
          className="flex flex-col justify-center duration-500">
            <div className="text-center md:text-left space-y-4 lg:max-w-[450px]">
            <h1 className="text-4xl font-bold !leading-snug">Join our Community to Start your Journey</h1>  
          <p className="text-dark2">Creating a label element for my required /desired website.This will be changed later</p>
          <a href="" className="primary-btn !mt-8">Join Now</a>      
            </div>
            </motion.div>
         
        {/* Banner Image */}
        <div className="flex justify-center items-center duration-500">
            <motion.img
            initial={{opacity:0, x:50}}
            whileInView={{opacity:1, x:0}}
            src={banner} alt=""  className="w-[350px] md:max-w-[450px] object-cover drop-shadow"/>
        </div>
       
    </div>

   </section>
  )
}

export default Banner2;