'use client'
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Always free",
    features: [],
    button: "Current plan",
    isActive: false,
  },
  {
    name: "Premium",
    price: "$9.00",
    description: "",
    features: [
      "AI Course Generation",
      "Course Banner Images",
      "Email Support"
    ],
    button: "Switch to this plan",
    isActive: false,
  }
];

const PlanCard = ({ plan }) => {
  const {user}=useUser();
  useEffect(()=>{
    user&&GetUserDetail()
  },[user])
  const [userDetail,setUserDetail]=useState();
  const GetUserDetail=async()=>{
    const result=await db.select().from(USER_TABLE).where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
    setUserDetail(result[0]);
  }
  const onCheckoutClick=async()=>{
    const result=await axios.post('/api/payment/checkout',{
      priceId:process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY
    });
    console.log(result.data);
    window.open(result.data?.url)
  }
  const onPaymentManage=async()=>{
    console.log(userDetail?.customerId );
    const result=await axios.post('/api/payment/manage-payment',{
      customerId:userDetail?.customerId 
    })
    console.log(result.data)
  }

  return (
    <div className={`border rounded-xl p-6 shadow-md w-full max-w-sm flex flex-col justify-between gap-4 ${
      plan.isActive ? "ring-2 ring-black" : ""
    }`}>
      <div>
        <h2 className="text-xl font-semibold">{plan.name}</h2>
        {plan.description && <p className="text-sm text-gray-500">{plan.description}</p>}
        <p className="text-3xl font-bold mt-4">{plan.price} <span className="text-base font-normal">/month</span></p>
        {plan.name !== "Free" && (
          <div className="flex items-center mt-2 gap-2 text-sm text-gray-600">
          </div>
        )}

        {plan.features.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center">
                <span className="mr-2 text-green-600">✓</span>{feature}
              </li>
            ))}
          </ul>
        )}
      </div>
     { plan.name != "Free"&&(userDetail?.isMember==false?<button onClick={onCheckoutClick} className="mt-6 w-full bg-black text-white py-2 rounded-md cursor-pointer">
        {plan.button}
      </button>:<button onClick={onPaymentManage} className="mt-6 w-full bg-black text-white py-2 rounded-md cursor-pointer">
        Manage Payment
      </button>)}
    </div>
  );
};

const PricingPlans = () => {
  return (
    <div className="py-12 px-4 text-center">
      <h1 className="text-3xl font-bold mb-8">Select Plan</h1>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
        {plans.map((plan, idx) => (
          <PlanCard key={idx} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
