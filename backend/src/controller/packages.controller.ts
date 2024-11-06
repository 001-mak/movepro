import type { Request, Response } from "express";
import prismaClient from "../config/prisma";
import HttpStatus from "http-status";

export const handleGetSubscriptionPlans = async (req: Request, res: Response) => {
    try {
        const subscriptionPlans = await prismaClient.tbl_subscription_plan.findMany();
        if (!subscriptionPlans) {
            return res.status(HttpStatus.OK).json({ message: "No Subscription Plans available" });
        }
        return res.status(HttpStatus.OK).json(subscriptionPlans);
    } catch (error) {
        console.error(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve subscription plans" });
    }
};

export const handleGetSubscriptionPlanById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const subscriptionPlan = await prismaClient.tbl_subscription_plan.findUnique({
            where: { id: Number(id) },
        });
        
        return res.status(HttpStatus.OK).json(subscriptionPlan);
    } catch (error) {
        console.error(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve subscription plan" });
    }
};

export const handleDeleteSubscriptionPlan = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prismaClient.tbl_subscription_plan.delete({
            where: { id: Number(id) },
        });
        return res.status(HttpStatus.OK).json({ message: "Subscription Plan Record Deleted" });
    } catch (error) {
        console.error(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to delete subscription plan" });
    }
};

export const handleUpdateSubscriptionPlan = async (req: Request, res: Response) => {
    const data = req.body as Partial<{ subscription_plan_name: string; subscription_plan_price: string }>;
    const { id } = req.params;

    try {
        const updatedPlan = await prismaClient.tbl_subscription_plan.update({
            where: { id: Number(id) },
            data,
        });
        return res.status(HttpStatus.OK).json({ message: "Subscription Plan Updated", data: updatedPlan });
    } catch (error) {
        console.error(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to update subscription plan" });
    }
};

export const handleCreateSubscriptionPlan = async (req: Request, res: Response) => {
    const data = req.body as { subscription_plan_name: string; subscription_plan_price: string };

    try {
        const newPlan = await prismaClient.tbl_subscription_plan.create({
            data,
        });
        return res.status(HttpStatus.CREATED).json({ message: "Subscription Plan Created", data: newPlan });
    } catch (error) {
        console.error(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to create subscription plan" });
    }
};
