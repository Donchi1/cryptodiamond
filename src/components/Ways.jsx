import React from "react";
import { motion } from "framer-motion";

function Ways() {
  return (
    <section className="w-full pb-20 ">
      <div className="w-full bg-gold way-bg1 h-[90vh]">
        <div className="flex ">
          <div className="way-bg flex-1 h-[90vh] hidden lg:block"></div>

          <div className="flex-1 flex justify-center items-center text-white">
            <motion.div
              animate={{ opacity: 0, translateX: "-100px" }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ easing: ["linear"], duration: 1 }}
              viewport={{ once: true }}
              className="lg:w-[70%] w-[90%] mx-auto my-8"
            >
              <h3 className="text-left text-white font-[500] capitalize text-4xl">
                How It Work?
              </h3>
              <div className="mt-8">
                <div className="flex justify-center items-center gap-4 ">
                  <div className="flex justify-center font-bold text-white items-center w-[50px] h-[50px] rounded-full ring-2 bg-primary2  ring-gold">
                    <span>1</span>
                  </div>
                  <div className="flex-1 ">
                    <h6 className="mb-1 mt-3 text-2xl font-[500] ">
                      Register &amp; Log in
                    </h6>
                    <div className="text-[]">
                      <p>
                        Creating an account is the first step. then you need to
                        log in
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4 ">
                  <div className="flex justify-center font-bold text-white items-center w-[50px] h-[50px] rounded-full ring-2 bg-primary2  ring-gold">
                    <span>2</span>
                  </div>
                  <div className="flex-1 ">
                    <h6 className="mb-1 mt-3 text-2xl font-[500] ">Add Fund</h6>
                    <div className="text">
                      <p>
                        Next, pick a payment method and add funds to your
                        account
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4 ">
                  <div className="flex justify-center font-bold text-white items-center w-[50px] h-[50px] rounded-full ring-2 bg-primary2  ring-gold">
                    <span>3</span>
                  </div>
                  <div className="flex-1 ">
                    <h6 className="mb-1 mt-3 text-2xl font-[500] ">
                      Select a service
                    </h6>
                    <div className="text-[]">
                      <p>
                        Select the services you want and get ready to receive
                        more publicity
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4 ">
                  <div className="flex justify-center font-bold text-white items-center w-[50px] h-[50px] rounded-full ring-2 bg-primary2  ring-gold">
                    <span>4</span>
                  </div>
                  <div className="flex-1 ">
                    <h6 className="mb-1 mt-3 text-2xl font-[500] ">
                      Enjoy Super Results
                    </h6>
                    <div className="text-[]">
                      <p>
                        You can enjoy incredible results when your trading is
                        complete
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ways;
