import type { NextFunction, Request, Response } from "express";
import prismaClient from "../config/prisma";
import jwt from "jsonwebtoken";
import { generateRandomString } from "../utils/common.util";
import { createAccessToken } from "../utils/generateTokens.util";
import { UserRoleEnum, UserStatus } from "../interface/constants";
import { TypedRequest, IUserRegister, UserLoginCredentials } from "../interface/interface";

export const handleUserRegister = async (
  req: TypedRequest<IUserRegister>,
  res: Response,
  next: NextFunction
) => {
  const {
    first_name,
    last_name,
    username,
    email,
    phone,
    company,
    street,
    city,
    state,
    zip,
    country,
    password,
    packageplan,
  } = req.body;
  if (
    first_name &&
    last_name &&
    username &&
    email &&
    phone &&
    company &&
    street &&
    city &&
    state &&
    zip &&
    country &&
    password
  ) {
    const checkUserEmail = await prismaClient.tbl_user.findFirst({
      where: {
        OR: [{ email_id: email }, { username: username }],
      },
    });

    if (checkUserEmail)
      return res.status(400).json({ message: "User already exists." }); // email is already in db

    const salt = generateRandomString(10);
    const hashedPassword = require("crypto")
      .createHash("md5")
      .update(password + salt)
      .digest("hex");
    const publish_key = generateRandomString(50);
    const secret_key = generateRandomString(70);
    const validation_id = generateRandomString(27);

    try {
      const user = await prismaClient.tbl_user.create({
        data: {
          username: username,
          password: hashedPassword,
          salt: salt,
          first_name: first_name,
          last_name: last_name,
          email_id: email,
          phone_no: phone,
          alter_phone_no: "",
          picture: "",
          bio: "",
          cover_photo: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          status: UserStatus.ACTIVE,
          role: UserRoleEnum.TenantAdmin,
          added_by: 0,
          validation_id: validation_id,
          reset_key: "",
          ssn: "",
          hire_date: null,
          starting_pay: "",
          current_pay: "",
          eligible_sales: 0,
          lead_commision: "",
          annual_sale: "",
          lifetime_sale: "",
          lifetime_commision: "",
          employee_type: 0,
          notes: "",
          Agreement: "",
          signature: "",
        },
      });

      const userId = user.id;

      const companyObj = await prismaClient.tbl_company.create({
        data: {
          user_id: userId,
          company_name: company,
          company_email: email,
          street: street,
          city: city,
          state: state,
          zip: zip,
          country: country,
          company_logo: "",
          website: "",
          social_fb: "",
          social_tw: "",
          social_in: "",
          social_insta: "",
          social_tube: "",
          slogan: "",
          tax_id: "",
          us_dot: "",
          company_mc: "",
          minimum_hour: "",
          social_pin: "",
          plan_purchased: packageplan ?? null,
          plan_purchased_status: "1",
          publish_key: publish_key,
          secret_key: secret_key,
        },
      });
      const companyid = companyObj.id;

      const updatedUser = await prismaClient.tbl_user.update({
        where: { id: user.id },
        data: { company_id: companyObj.id },
      });

      // await prismaClient.tbl_notifications.create({
      //   data: {
      //     company_id: companyid,
      //     phone: phone,
      //     phone_active: "1",
      //     email: email,
      //     email_active: "1",
      //     movingreminder_active: "1",
      //     time: "24",
      //     autoresponder_active: "1",
      //     autoresponder_time: "5",
      //     review_active: "1",
      //     customer_notif: "1",
      //     cust_sms_text:
      //       "Your moving Quote is ready please view and update your information and inventory. Click the link {link}",
      //   },
      // });

      // await prismaClient.tbl_tax.create({
      //   data: {
      //     company_id: companyid,
      //     tax_rate: "0",
      //   },
      // });
      // await createInventoryGroupsAndItems(companyid, company, phone);

      const userData = {
        id: user.id,
        company_id: updatedUser.company_id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email_id: user.email_id,
        phone_no: user.phone_no,
        picture: user.picture,
        bio: user.bio,
        cover_photo: user.cover_photo,
        status: user.status,
        role: user.role,
        added_by: user.added_by,
        join_date: user.join_date,
      };

      const accessToken = createAccessToken(
        userData.id,
        userData.username,
        userData.first_name,
        userData.last_name,
        userData.email_id,
        userData.added_by ?? 0,
        userData.role,
        userData.company_id ?? 0
      );

      res.status(200).json({ accessToken, userData });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: JSON.stringify(error), ex: error });
      //next(error)
    }
  } else {
    next({ message: "missing required fields" });
  }
};

const createInventoryGroupsAndItems = async (
  companyid: number,
  companyname: string,
  phone: string
) => {
  try {
    const inventoryGroups = [
      {
        groupName: "DINING ROOM",
        items: [
          { itemName: "Hutch (Top)", itemSize: 20 },
          { itemName: "Cabinet, Corner", itemSize: 20 },
          { itemName: "Dining Table", itemSize: 30 },
          { itemName: "Dining Chair", itemSize: 5 },
          { itemName: "Server", itemSize: 15 },
          { itemName: "Tea Cart", itemSize: 10 },
          { itemName: "Rugs", itemSize: 10 },
          { itemName: "Barrel, Dishes", itemSize: 15 },
          { itemName: "Buffet", itemSize: 30 },
          { itemName: "Chair, Arm", itemSize: 8 },
          { itemName: "Chair, Straight", itemSize: 5 },
          { itemName: "China Closet", itemSize: 25 },
          { itemName: "Dining Table, extension", itemSize: 30 },
        ],
      },
      {
        groupName: "LIVING ROOM",
        items: [
          { itemName: "Magazine rack", itemSize: 2 },
          { itemName: "Lamp, Pole", itemSize: 3 },
          { itemName: "Lamp, Floor", itemSize: 3 },
          { itemName: "Hall Tree Large", itemSize: 12 },
          { itemName: "Hall Tree Rack", itemSize: 2 },
          { itemName: "Footstool", itemSize: 2 },
          { itemName: "Fireplace Equipment", itemSize: 5 },
          { itemName: "Desk, Secretary", itemSize: 35 },
          { itemName: "Desk, Small / Winthrop", itemSize: 22 },
          { itemName: "Day Bed", itemSize: 30 },
          { itemName: "Credenza", itemSize: 35 },
          { itemName: "Clock, Grandfather", itemSize: 20 },
          { itemName: "Chest, Cedar", itemSize: 15 },
          { itemName: "Chair, Overstuffed", itemSize: 25 },
          { itemName: "Chair, Occasional", itemSize: 15 },
          { itemName: "Chair, Rocker", itemSize: 12 },
          { itemName: "Chair, Arm", itemSize: 10 },
          { itemName: "Cabinet, Curio", itemSize: 10 },
          { itemName: "Bookshelves, sect.", itemSize: 5 },
          { itemName: "Bookcase", itemSize: 20 },
          { itemName: "bench, Piano", itemSize: 5 },
          { itemName: "Bar, Portable", itemSize: 15 },
          { itemName: "Chair, Straight", itemSize: 5 },
          { itemName: "Music cabinet", itemSize: 10 },
          { itemName: "Piano, baby", itemSize: 70 },
          { itemName: "Piano, grand", itemSize: 80 },
          { itemName: "Piano spinet", itemSize: 60 },
          { itemName: "Radio table", itemSize: 2 },
          { itemName: "Rugs", itemSize: 10 },
          { itemName: "Sofa sec", itemSize: 10 },
          { itemName: "Sofa loveseat", itemSize: 30 },
          { itemName: "Sofa 3 cushion", itemSize: 35 },
          { itemName: "Sofa hide 4 cushion", itemSize: 50 },
          { itemName: "Stereo component", itemSize: 60 },
          { itemName: "Stereo console", itemSize: 8 },
          { itemName: "Table drop leaf", itemSize: 15 },
          { itemName: "Table occasional", itemSize: 15 },
          { itemName: "Table coffee", itemSize: 12 },
          { itemName: "Table ends", itemSize: 5 },
          { itemName: "TV big screen", itemSize: 40 },
          { itemName: "TV portable", itemSize: 5 },
          { itemName: "TV stand", itemSize: 3 },
          { itemName: "Trunk", itemSize: 5 },
        ],
      },
      {
        groupName: "BEDROOM",
        items: [
          { itemName: "Bed bunk set of 2", itemSize: 70 },
          { itemName: "Bed rollaway", itemSize: 20 },
          { itemName: "Bed single", itemSize: 40 },
          { itemName: "Bed double", itemSize: 60 },
          { itemName: "Bed queen", itemSize: 65 },
          { itemName: "Bed king", itemSize: 70 },
          { itemName: "bed waterbed base", itemSize: 10 },
          { itemName: "Bookshelves", itemSize: 5 },
          { itemName: "Chair boudoir", itemSize: 10 },
          { itemName: "Chair rocker", itemSize: 5 },
          { itemName: "Chair lounge", itemSize: 25 },
          { itemName: "Double dresser", itemSize: 50 },
          { itemName: "Dresser triple", itemSize: 60 },
          { itemName: "Night stand", itemSize: 5 },
        ],
      },
      {
        groupName: "KITCHEN",
        items: [
          { itemName: "Kitchen chair", itemSize: 5 },
          { itemName: "Kitchen table", itemSize: 10 },
          { itemName: "Chair high", itemSize: 5 },
          { itemName: "Kitchen cabinet", itemSize: 30 },
          { itemName: "Microwave oven", itemSize: 10 },
          { itemName: "Serving cart", itemSize: 15 },
          { itemName: "Stool", itemSize: 3 },
        ],
      },
      {
        groupName: "OFFICE",
        items: [
          { itemName: "Bookcase", itemSize: 20 },
          { itemName: "Chair", itemSize: 8 },
          { itemName: "Computer/pc monitor", itemSize: 15 },
          { itemName: "Copier / Printer", itemSize: 8 },
          { itemName: "Desk computer", itemSize: 25 },
          { itemName: "Desk hutch", itemSize: 28 },
          { itemName: "Desk office", itemSize: 30 },
          { itemName: "Desk secretary", itemSize: 35 },
        ],
      },
      {
        groupName: "NURSERY",
        items: [
          { itemName: "Bassinette", itemSize: 5 },
          { itemName: "Bed youth", itemSize: 30 },
          { itemName: "Chair child's", itemSize: 3 },
          { itemName: "Chair high", itemSize: 5 },
          { itemName: "Chest", itemSize: 12 },
          { itemName: "Crib baby", itemSize: 10 },
          { itemName: "Table child's", itemSize: 5 },
          { itemName: "Playpen", itemSize: 5 },
          { itemName: "Rug", itemSize: 3 },
          { itemName: "Stroller baby", itemSize: 8 },
        ],
      },
      {
        groupName: "GARAGE",
        items: [
          { itemName: "Utility trailer", itemSize: 50 },
          { itemName: "Motorcycle large", itemSize: 100 },
          { itemName: "Motorcycle small", itemSize: 58 },
          { itemName: "3/4 wheelers", itemSize: 50 },
          { itemName: "Cabinet utility", itemSize: 10 },
          { itemName: "Camper", itemSize: 500 },
          { itemName: "Camper shell", itemSize: 300 },
          { itemName: "Canoe, kayak", itemSize: 50 },
          { itemName: "Car ramps", itemSize: 8 },
          { itemName: "Golf cart", itemSize: 40 },
          { itemName: "Snow Mobile", itemSize: 60 },
        ],
      },
      {
        groupName: "OUTDOOR",
        items: [
          { itemName: "BBQ grill", itemSize: 10 },
          { itemName: "Chair aluminum", itemSize: 1 },
          { itemName: "Chair metal", itemSize: 3 },
          { itemName: "Chair wood", itemSize: 5 },
          { itemName: "Garden hose & tools", itemSize: 10 },
          { itemName: "Glider or settee", itemSize: 20 },
          { itemName: "Ladder extension", itemSize: 10 },
          { itemName: "Lawn mower hand", itemSize: 5 },
          { itemName: "Lawn mower power", itemSize: 15 },
          { itemName: "Lawn mover riding", itemSize: 35 },
          { itemName: "Lawn edger", itemSize: 3 },
          { itemName: "Leaf sweeper", itemSize: 5 },
          { itemName: "Outdoor child slider", itemSize: 10 },
          { itemName: "Outdoor child gym", itemSize: 20 },
          { itemName: "Outdoor dry racks", itemSize: 5 },
          { itemName: "Outdoor swings", itemSize: 30 },
          { itemName: "Picnic table", itemSize: 20 },
          { itemName: "Picnic bench", itemSize: 5 },
          { itemName: "Roller lawn", itemSize: 15 },
          { itemName: "Sand box", itemSize: 10 },
          { itemName: "Spreader", itemSize: 2 },
          { itemName: "Table", itemSize: 2 },
          { itemName: "Umbrella", itemSize: 5 },
          { itemName: "Wheelbarrow", itemSize: 8 },
        ],
      },
      {
        groupName: "APPLIANCE",
        items: [
          { itemName: "Air cond. Wind. small", itemSize: 15 },
          { itemName: "Air cond. wind. large", itemSize: 20 },
          { itemName: "Dehumidified", itemSize: 10 },
          { itemName: "Dishwasher", itemSize: 20 },
          { itemName: "Freezer 10 or less", itemSize: 30 },
          { itemName: "Freezer 11 to 15", itemSize: 45 },
          { itemName: "Freezer 16 or over", itemSize: 60 },
          { itemName: "Ref. 6 cu. ft. or less", itemSize: 30 },
          { itemName: "Ref. 7 to 10cu.ft.", itemSize: 45 },
          { itemName: "Ref. 11 cu.ft. /over", itemSize: 60 },
          { itemName: "Trash compactor", itemSize: 15 },
          { itemName: "Vaccuum cleaner", itemSize: 5 },
          { itemName: "washing machine", itemSize: 25 },
          { itemName: "Dryer", itemSize: 25 },
        ],
      },
      {
        groupName: "BOXES",
        items: [
          { itemName: "Book box", itemSize: 2 },
          { itemName: "Medium box", itemSize: 3 },
          { itemName: "Large box", itemSize: 6 },
          { itemName: "Dish pack", itemSize: 10 },
          { itemName: "Wardrobe", itemSize: 16 },
        ],
      },
      {
        groupName: "SPORT EQUIPMENT",
        items: [
          { itemName: "Bicycle", itemSize: "7" },
          { itemName: "Camp stove", itemSize: 5 },
          { itemName: "Exercise bike", itemSize: 10 },
          { itemName: "Skis", itemSize: 2 },
          { itemName: "Treadmill / Stairstepper", itemSize: 20 },
          { itemName: "Universal gym Component", itemSize: 10 },
          { itemName: "Weight bench", itemSize: 5 },
          { itemName: "Tricycle", itemSize: 2 },
        ],
      },
      {
        groupName: "MISCELLANEOUS",
        items: [
          { itemName: "Ash or trash can", itemSize: 5 },
          { itemName: "Basket clothes", itemSize: 5 },
          { itemName: "Bird cage & stand", itemSize: 5 },
          { itemName: "Card table", itemSize: "1" },
          { itemName: "Carriage baby", itemSize: 15 },
          { itemName: "Chair folding", itemSize: "1" },
          { itemName: "Clothe hamper", itemSize: 5 },
          { itemName: "Cot folding", itemSize: 5 },
          { itemName: "Fan", itemSize: 5 },
          { itemName: "Footlocker", itemSize: 5 },
          { itemName: "Golf bag", itemSize: 2 },
          { itemName: "heater / gas/ elec.", itemSize: 5 },
          { itemName: "Metal shelves", itemSize: 5 },
          { itemName: "Plant stand", itemSize: 5 },
          { itemName: "Ping pong table", itemSize: 20 },
          { itemName: "Pool table w/o slate", itemSize: "40" },
          { itemName: "Pool table w slate", itemSize: "100" },
          { itemName: "Sewing machine", itemSize: 10 },
          { itemName: "Sled", itemSize: 2 },
          { itemName: "Step ladder", itemSize: 5 },
          { itemName: "Suitcase", itemSize: "4" },
          { itemName: "Table utility", itemSize: 5 },
          { itemName: "Tackle box", itemSize: 2 },
          { itemName: "Tool Chest, small", itemSize: 5 },
          { itemName: "Tool chest medium", itemSize: 10 },
          { itemName: "Tool chest large", itemSize: 15 },
          { itemName: "Wagon child", itemSize: 5 },
          { itemName: "Workbench", itemSize: 20 },
          { itemName: "Auto tires", itemSize: 2 },
          { itemName: "Brooms and mops bundle", itemSize: 2 },
        ],
      },
    ];

    const groupData = inventoryGroups.map((group) => ({
      company_id: companyid,
      groupName: group.groupName,
      items: group.items.map((item) => ({
        itemName: item.itemName,
        itemSize: item.itemSize,
      })),
    }));

    await prismaClient.tbl_inventory_groups.createMany({
      data: groupData.map((group) => ({
        company_id: group.company_id,
        group_name: group.groupName,
      })),
      skipDuplicates: true,
    });

    let savedGroup = await prismaClient.tbl_inventory_groups.findMany({
      where: {
        company_id: companyid,
      },
    });
    const itemsData: any = [];

    savedGroup?.forEach((group: any) => {
      let sg = groupData.find((x) => x.groupName == group.group_name);

      sg?.items.forEach((item) => {
        itemsData.push({
          group_id: group.id,
          item_name: item.itemName,
          item_size: String(item.itemSize),
        });
      });
    });

    if (itemsData?.length)
      await prismaClient.tbl_inventory_group_items.createMany({
        data: itemsData,
      });

    const materials = [
      {
        company_id: companyid,
        material_name: "tape",
        material_description: "6 roll",
        material_price: 15,
      },
      {
        company_id: companyid,
        material_name: "Box 1",
        material_description: "1cm x 5cm x 9cm",
        material_price: 25,
      },
      {
        company_id: companyid,
        material_name: "Boxes",
        material_description: "S/M/L",
        material_price: 5,
      },
      {
        company_id: companyid,
        material_name: "Shrink Wrap",
        material_description: "plastic 1500",
        material_price: 35,
      },
      {
        company_id: companyid,
        material_name: "cartoon1",
        material_description: "1ft x 1ft x 1ft",
        material_price: 50,
      },
      {
        company_id: companyid,
        material_name: "Cartoon 2",
        material_description: "2ft x 2ft x 2ft",
        material_price: 75,
      },
      {
        company_id: companyid,
        material_name: "Cartoon3",
        material_description: "3ft x 3ft x 3ft",
        material_price: 100,
      },
      {
        company_id: companyid,
        material_name: "Cartoon 4",
        material_description: "4ft x 4ft x 4ft",
        material_price: 150,
      },
      {
        company_id: companyid,
        material_name: "Mattress cover",
        material_description: "F/Q/K",
        material_price: 15,
      },
      {
        company_id: companyid,
        material_name: "TV box",
        material_description: "Tv box",
        material_price: 85,
      },
      {
        company_id: companyid,
        material_name: "Wardrobe",
        material_description: "wardrobe",
        material_price: 20,
      },
      {
        company_id: companyid,
        material_name: "Picture Cartons",
        material_description: "Mirror CTN 4pcs",
        material_price: 15,
      },
      {
        company_id: companyid,
        material_name: "paper pad",
        material_description: "",
        material_price: 50,
      },
      {
        company_id: companyid,
        material_name: "Bubbles wrap",
        material_description: "150 Yard",
        material_price: 75,
      },
      {
        company_id: companyid,
        material_name: "Wrapping Paper",
        material_description: "1 bundle",
        material_price: 35,
      },
      {
        company_id: companyid,
        material_name: "TAPE",
        material_description: "6 ROLL",
        material_price: 12,
      },
      {
        company_id: companyid,
        material_name: "BOXES",
        material_description: "S/M/L",
        material_price: 4,
      },
      {
        company_id: companyid,
        material_name: "SHRINK WARP",
        material_description: "",
        material_price: 30,
      },
      {
        company_id: companyid,
        material_name: "MATTRESS COVER",
        material_description: "",
        material_price: 15,
      },
      {
        company_id: companyid,
        material_name: "TV BOX",
        material_description: "",
        material_price: 95,
      },
    ];

    const result = await prismaClient.tbl_materials.createMany({
      data: materials,
    });

    let moving_policy = `
  &lt;p style=&quot;text-align:center&quot;&gt;&lt;strong&gt;&lt;big&gt;Your Moving Crew&amp;nbsp;will&amp;nbsp;arrive with hand trucks, shoulder dolly carrying&amp;nbsp;straps and Tools.&lt;/big&gt;&lt;/strong&gt;&lt;/p&gt;
  
  &lt;p style=&quot;text-align:center&quot;&gt;&lt;big&gt;&lt;strong&gt;Professional grade furniture blanketing will also be used to protect your items with purchase of our relocation service.&lt;/strong&gt;&lt;/big&gt;&lt;/p&gt;
  
  &lt;p&gt;&amp;nbsp;&lt;/p&gt;
  
  &lt;p&gt;&lt;big&gt;&lt;strong&gt;MOVING POLICY &amp;amp; LIMITS OF LIABILITY&amp;nbsp;&lt;/strong&gt;&lt;/big&gt;&lt;br /&gt;
  &lt;br /&gt;
  NOTE: We have bolded the policy sections to help you find them quicker. Please take the time to review the policies that apply. If you have any questions or concerns, please do not hesitate to contact us at ${phone}&amp;nbsp;&lt;br /&gt;
  ${companyname}&amp;nbsp;provides safe and efficient moves to each of its valued customers. To do this, the company has put some policies in place that will enable each customer to have a stress-free move. Each policy is detailed below &amp;amp; in our Terms &amp;amp; Condition&amp;rsquo;s. Our Stress-Free Superhero&amp;#39;s are available to answer any questions you have about any of the following information. Our moving estimates are based on the information you provided and our experience and expertise. This is only an estimate as our customers have complete control over the time for service, so actual times may vary. The actual time can vary due to lack of preparation, poor access at job site, or additional items to be moved not originally accounted for in the proposal. Job cost is directly correlated to access and quantity of household goods to be moved. We do our best to accurately estimate the cost of your move but due to variables out of our control, ${companyname} does not guarantee completion time. Due to scheduling constraints ${companyname} reserves the right to send personnel depending on availability and need.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;Guidance, Walk-trough, and Payment.&lt;/strong&gt; The customer or his representative over the age of 18 years must be always present during the move. We need your guidance! It is customer&amp;rsquo;s responsibility to do a final &amp;ldquo;walkthrough&amp;rdquo; of the premises to ensure we have taken everything. Our time runs continuously until all tools and equipment are back in the truck and payment is completed. ${companyname}&amp;nbsp;has a 2-hour minimum, make sure you have your payment ready to go at the end of the job to avoid paying for any extra time.&amp;nbsp;&lt;/p&gt;
  
  &lt;p&gt;&lt;strong&gt;1. Deposit:&lt;/strong&gt; For all moves, a booking deposit must be paid with a credit/debit card. The remaining balance must be paid in full upon completion of the job before we leave the premises&lt;br /&gt;
  &lt;strong&gt;2. Payment Options.&lt;/strong&gt; We accept the following: All major credit card or debit card. (3.5% processing fee on all electronic payments).&lt;br /&gt;
  &lt;strong&gt;3. Long Distance/Interstate Moves.&lt;/strong&gt; We require payments at the time of delivery for any balance due on long-distance moves in the form of all major credit&lt;br /&gt;
  card or debit card. For all long distance moves we require the trip fee paid in advance to secure the crew and truck for your move (see our cancellation policy on deposits)&lt;br /&gt;
  &lt;strong&gt;4. Items that MUST Be Removed Prior to Moving Day:&lt;/strong&gt; On moving day please make sure you have all the following items removed and placed in your vehicle or a secure &amp;amp; locked area: All medications, checks, passports, documents, precious stones, jewelry, cash, coins, expensive China &amp;amp; glassware, credit cards, firearms, statuary, flammables, stocks &amp;amp; bonds, furs, fine art, collectibles, computers, laptops, gaming consoles and games or other similar valuables. Prior to your move we will be asked to sign a waiver that all has been completed.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;5. Cancellation Policy:&lt;/strong&gt; All deposits are final and non-refundable. If you need to cancel services or reschedule, we will honor your deposit for up to a month.&lt;br /&gt;
  &lt;strong&gt;6. Narrow Spaces.&lt;/strong&gt; Lofts, townhouses, apartments, and high-rises are well known for having small, tight stairwells and entrances. Sometimes modern-day furniture does not fit into these places. Our crew will do their best, but we cannot be held responsible if an item does not fit into your residence. ${companyname} will not be responsible for damage caused by any non-routine moving including, but not limited to; hoisting, standing pieces on end, handling items over railings, sharp turns, overcrowded areas, and tight hallways/entrances.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;7. Parking Arrangements&lt;/strong&gt;. Customer is responsible for requesting moving permits if ones may be required. We can only recommend getting permits for all&lt;br /&gt;
  moves as they guarantee parking the moving truck as close as possible to your doorway. Because you are familiar with the parking situation on your street, you must decide if you need one or if you can manage parking on your own. In most cases we require 20-40 feet to park the truck. Please get moving permits if you think Mover may have trouble parking at your address or let us know, so we can take appropriate arrangements for you. If there is nowhere to park at the time of mover&amp;rsquo;s arrival, the crew will start your moving clock while they will be searching for parking. Driver reserves the right to park anywhere at his discretion to better perform services. Customer will be responsible to pay any parking fees or tickets assessed to the carrier for any vehicle under hire by the customer at the time of the charge.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;8. Damages and Claims: &lt;/strong&gt;Any damage claims must be submitted in writing to our claims department. Applicable notes about these damages must be made on the day of your move before Mover leave your premises. Our company standards do assume a full inspection of furniture by both our Mover and customers; however, the final inspection is the responsibility of the customer. All our customers sign a bill of lading upon completion of a move. It reads &amp;ldquo;I have inspected my goods and premises, including but not limited to elevators, floors, and stairwells. There are no damages except as noted. The cab and the back of the truck are empty, and the job is complete&amp;rdquo;. We have less than a 1% damage claim ratio, but understanding accidents may happen. &amp;nbsp;Please note, payment must be made in full to process any claims. Do not assume you may deduct the money from the final bill to compensate yourself in the event of damage. This is ILLEGAL and considered Theft of Services.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;9. Refrigerator Move.&lt;/strong&gt; We only move empty freezers/refrigerators and please make sure freezers are defrosted. Please empty the contents for safe moving. We are prohibited to move perishable foods. We also cannot disconnect or reconnect appliances containing water valves so please have these items prepared prior to our arrival. &amp;nbsp;&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;10. Grandfather Clocks.&lt;/strong&gt; You are responsible for removing the pendulum, chimes, and weights. Clocks are very delicate to and may need to be retuned or adjusted after you move has been completed by a professional.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;11. Dresser Drawers, File Cabinets, Desk Drawers:&lt;/strong&gt;&amp;nbsp;Please empty all dresser drawers, file cabinets and desk drawers. Remember that the furniture will have to be lifted and carried, so if it&amp;rsquo;s overstuffed and extra heavy it will be more difficult to handle and may compromise the integrity of the furniture. If the furniture will have to be navigated through challenging obstacles, like a winding staircase, it&amp;rsquo;s usually best to remove everything, even the drawers, as it may be necessary to flip the furniture on its side or upside-down to get it through. The more prepared you are the more efficient we can be, and the quicker the job can be completed. Loose and unpacked items can add time to the estimate and can get misplaced or lost.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;12. Marble.&lt;/strong&gt; ${companyname} will not be responsible for any or all types of marble, due to the age or hairline crack that can cause splitting. We recommend that you place the marble in your personal vehicles for safe transportation or crate it professional by a 3rd party crating company prior to transport. &amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;13. Last Minute Change of Service:&lt;/strong&gt;&amp;nbsp;If the move requires work above and beyond the original order for services, ${companyname}&amp;nbsp;reserves the right to fulfill other obligations before completing additional work. For example, you have originally ordered services for two (2) rooms move only. On the day of the move, you are adding additional rooms to move, or additional stops not mentioned at the time of request, which will significantly increase total move time. To make our schedule on time for the next move, we reserve the right to postpone additionally requested services till our next availability and/or after completion of other jobs that day.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;14.TV&amp;#39;s &amp;amp;&amp;nbsp;Flat Screen TVs:&lt;/strong&gt;&amp;nbsp;These are susceptible to damage from extreme temperatures, slight bumps, and altitude changes. The original packaging is the best. In any case, please note that in the absence of physical evidence of external damage or negligence (visible damage) we are not responsible for TVs functioning after delivery. TV&amp;rsquo;s must be professionally packed in a flat screen TV carton, original carton with the original Styrofoam, or crated in a wooden crate.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;15. Weather Conditions:&lt;/strong&gt;&amp;nbsp;${companyname}&amp;nbsp;reserves the right to reschedule the move at an agreed upon time, without liability if there is inclement weather, including, but not limited to heavy/freezing rain, snow emergency, hurricane warning, weather travel ban etc. You will have the option of being rescheduled to our next available day. We will do our best to reschedule you as soon as possible.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;16. Driveways:&lt;/strong&gt;&amp;nbsp;${companyname} will not drive our truck off the street surface or on very steep surfaces. In certain instances, there may be time required to position the truck onto your property or in the street. Any time spent positioning the truck will be on the clock. Please be aware that positioning a large truck into some driveways may be extremely difficult. &amp;nbsp;Unless otherwise instructed,&amp;nbsp;${companyname} will not be responsible for any damage to driveways, lawns, sprinklers, meters, trees, etc. Our drivers are very experienced and will be as careful as possible when positioning the truck.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;17. Safe Pathways &amp;amp; Access:&lt;/strong&gt;&amp;nbsp;Please ensure that your walkways are safe. If there are any access problems: flooding, hills, long unpaved driveways, loose gravel, etc., please let us know.&amp;nbsp;${companyname} is prohibited to take trucks off pavement or park on steep grades.&amp;nbsp;${companyname} will not drive a truck over freshly graveled driveways, lawn sidewalk or other area not designated for truck traffic. Doing so may cause ruts in the grass, cracking of concrete, loss of vegetation, damage to underground sprinklers, drain fields or other damage.&amp;nbsp;${companyname} is not responsible for any damage or towing charges, which may result, whether foreseeable or not. Any time spent positioning the truck(s) or time lost due to truck(s) getting stuck will be at customer&amp;#39;s expense.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;18. Right of Refusal:&lt;/strong&gt;&amp;nbsp;${companyname} will not do anything that we feel is unsafe. We reserve the right not to service you under dangerous, unsanitary, or abusive conditions the determination of which is at our sole discretion, and we will not be liable to you or any other entity for direct or consequential damages. ${companyname} will not work in attics. Ceiling damage and personal injury may result. ${companyname} assumes no responsibility for ceilings.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;19. Elevator Times &amp;amp; Restrictions:&lt;/strong&gt;&amp;nbsp;You must notify us of any elevator time restrictions prior to confirming your move. This will ensure that we can meet those restrictions to the best of our ability. If we are not notified of the elevator restrictions prior to confirming your job we will not be held responsible for meeting the time restriction. If you notify us about an elevator time restriction after your move is scheduled with us we may not be able to meet that restriction and we will inform you if we can do so.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;20. Certificate of Insurance:&lt;/strong&gt;&amp;nbsp;It is your responsibility to check with your building to see if we need to provide a certificate of insurance prior to the move or any other requirements that are necessary. If we are not notified of the certificate of insurance or other requirements we will not be held responsible. A full certificate of insurance usually requires a week to be processed. If your building needs a certificate of insurance we will need to know who to list as certificate holder, any additional insured&amp;rsquo;s, a fax number/e-mail address, and the name of a representative of whom to send it to. If you have any questions please ask one of our Team&amp;nbsp;superhero&amp;#39;s ahead of time.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;21. Self-Storage:&lt;/strong&gt;&amp;nbsp;If you are loading or unloading into or out of self-storage, we are only responsible for damage caused while loading, transporting or unloading. It is the customer&amp;rsquo;s responsibility to provide padding (blankets, thick towels, padded paper, etc.) to protect their goods. You can purchase our paper pads which are $50&amp;nbsp;per bundle of 25. &amp;nbsp;Please let us know and we&amp;#39;ll dispatch them with your crew. We ask you to be present at the storage site to note the condition of your items. Our responsibility ends when the unloading is complete. We will move items into any storage unit of your choice; however, items will be stacked in the storage unit and we have no control over people coming into or out your unit after that time. For this reason, our liability ends as we unload the contents into storage.&amp;nbsp; In addition,&amp;nbsp;${companyname}&amp;nbsp;hereby disclaims all liability for any damage to client&amp;#39;s items that have been moved into a storage unit by a different moving company or by self-mover. ${companyname} is not responsible or liable for any damage or loss incurred or suffered in connection with the transportation and/or storage of the items.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;22. Help with Your Move:&lt;/strong&gt;&amp;nbsp;Please note: Insurance regulations prohibit us from allowing you on the truck and if you choose to help with any part of the move,&lt;br /&gt;
  per our contract, we are excluded from liability for the entire move, so we ask customers to not assist with any part of the service.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;23. Simulated Wood Products and Pressed Board: &lt;/strong&gt;These products have poor structural integrity, which does not lend itself to moving or repair. We will move these items carefully but cannot be responsible for damage of simulated wood or pressed board furniture. These items are excluded from all moving insurance coverage. A helpful tip from your friendly ${companyname}: Furniture manufactured from pressed-board and particleboard is designed to go into a box when it is moved from the manufacturer to the retailer then to the customer unassembled. It is not built to withstand the normal stresses of a move as an assembled unit. Most are not designed with the extra wood structural pieces to adequately brace the unit for movement out of or into a residence or office, nor the normal moving truck vibration, even in air-ride moving trailers. Usually, chips or dents are not repairable. Surface impressions can be made on the furniture when writing on a single piece of paper &amp;ndash; you can imagine how it must fare when stacked in a moving truck. Assembly instructions frequently suggest that connecting hardware pieces be glued in place. This does not significantly improve the structural integrity of the furniture, but does make disassembly impossible without creating substantial, irreparable damage. For these reasons, moving companies and third-party insurers do not offer increased insurance coverage for these types of items. We will do our best to transport these items for you in a safe and careful manner, but because pressed wood furniture is so unstable, we are unable to offer increased cargo valuation or increased insurance on these pieces. If damage does occur, you will be able to submit a claim only for the basic cargo valuation of $0.60 per pound. Full replacement value insurance excludes these items. Pressed wood and particleboard furniture is moved at your own risk!&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;24. Kids and Pets:&lt;/strong&gt;&amp;nbsp;For safety reasons and their protection, please find sitters for the kiddos and pets and please keep them out of the work areas.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;25. Disassemble &amp;amp; Re-assemble:&lt;/strong&gt;&amp;nbsp;${companyname} does not re-assemble any item that we did not disassemble unless we feel it is safe. We can take apart simple items like bed frames; take legs off tables, etc.&amp;nbsp; ${companyname} will not assemble or take apart anything that is too complex or that requires a manual. Please ask us prior to the move if you have a question.&amp;nbsp;&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;26. How to Save Money:&lt;/strong&gt;&amp;nbsp;Pack everything into uniform sized boxes with lids and mark them with the destination room. Stay close to the action. Move delicate items in your car. We are happy, to place them there and remove them. Disassemble your furniture before we arrive. Be as clear as possible with your directions to your service team.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;27. Hoisting.&lt;/strong&gt; Carrier is prohibited to move item{s) over a balcony due to safety issues.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;28. Aging and Deterioration:&lt;/strong&gt;&amp;nbsp;When moving household items, ${companyname} has found deterioration occurs over time due to age/heat/dry rotting. Wood dowels and furniture, mattresses lump and disfigure upon disturbing, lampshades and wiring also become brittle and rotten, and floor lamp base concrete may crumble and fell out. If you wish, we will move them carefully, but will not be responsible for damage of deteriorated items.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;29. Unsafe/Unique Moving Circumstances:&amp;nbsp;&lt;/strong&gt;We are often asked to perform tasks that border on the impossible.&amp;nbsp;${companyname} will not be responsible for damage caused by non-routine moving including but not limited to, standing pieces on end, sharp turns, overcrowded work areas, difficult stairways, snags and sharp edges in work areas and doorways, handing over balconies, railings, etc., tight squeezes, and damage caused by weather. ${companyname} is not responsible for any direct or indirect damage to items or surroundings, because of a specific customer request. You will be asked to sign a waiver if we agree to attempt a move that we deem unsafe or unreasonable.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;30. Flammables and Combustibles:&lt;/strong&gt;&amp;nbsp;${companyname} will not move&amp;nbsp;flammables or hazardous material due to safety laws and DOT regulations. As you prepare for your move, there are some things you should be prepared to move yourself or leave behind. Moving companies are not legally permitted to transport any hazardous materials. This includes items that are flammable, corrosive or combustible. What does this mean for you? If you have a gas barbecue grill you will need to disconnect the tank and take it with you, or the grill stays where it is. Your lawnmower and other power lawn tools must be emptied of fuel, or they do not go on the truck. You should also be sure to disconnect gas hookups for grills, dryers, water heaters and anything else that you plan to have your Mover take. Moving companies cannot handle gas connections. Please contact your gas company for servicing. We do not disconnect gas appliances under no circumstances. Non-allowable items include: stern (jelled fuel), Fire Extinguishers, Household Batteries, Matches, Aerosols, Chemistry Sets, Kerosene, Cleaning Solvents, Darkroom Chemicals, Gasoline, Ammonia, Pool Chemicals, Propane/Propane Tanks, Nail Polish, Nail Polish Remover, Motor Oil, Fireworks, Car Batteries, Charcoal, Charcoal Lighter, Liquid Bleach, Fertilizer, Paints (latex &amp;amp; oil-based), Paint Thinner, Pesticides, Firearms, Ammunition, Poisons (such as weed killer), Lamp Oils, Fuels. Customers must make other arrangements to transport these items.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;31. Transport Restrictions:&lt;/strong&gt;&amp;nbsp;${companyname} cannot transport people, live plants, or live animals (all aquariums must be emptied)&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;32. Electrical Connection &amp;amp; Dis-connection:&lt;/strong&gt;&amp;nbsp;We cannot disconnect any water, electrical, or gas lines from any appliance or item. We also cannot disassemble any item that requires such a disconnection or connection. You or your representative must check with property or building maintenance or accept any plumbing connections of your choice. Any assistance we give is as a courtesy only. Water and drain connections are not the responsibility of the mover.&amp;nbsp;&lt;br /&gt;
  &lt;strong&gt;33. Pianos &amp;amp; Safe Moving:&lt;/strong&gt;&amp;nbsp;We will gladly move upright pianos and safes. Please check with us prior to the move to make sure we can safely move it and check for additional applicable fees so there are no surprises on service day. We move pianos &amp;amp; safes ONLY ON GROUND LEVEL FLOOR.&lt;br /&gt;
  &lt;strong&gt;34. Structural Restrictions:&lt;/strong&gt;&amp;nbsp;Our goal is to move belongings as carefully as possible, however, in some cases, there may be elements of handling which are beyond our control such as narrow spaces, height restrictions, weight or maneuvering. ${companyname} cannot be responsible for any damages sustained to doors, walls, ceilings, stair railings and/or floors.&lt;/p&gt;
  
  &lt;p&gt;&amp;nbsp;&lt;br /&gt;
  &lt;big&gt;&lt;strong&gt;EXCLUSION OF LIABILITY&amp;nbsp;&lt;/strong&gt;&lt;/big&gt;&lt;br /&gt;
  1. ${companyname} liability for lost or damaged items is limited to $0.60 per pound per article unless the customer has purchased additional insurance.&lt;br /&gt;
  2. ${companyname} shall be responsible for replacement of any lost items listed on inventory page and inspected prior to move, subject to above limits. Items&lt;br /&gt;
  not listed on the inventory are not insured.&lt;br /&gt;
  3. The condition of any item(s) boxed by customer (PBO/packed by owner) and not inspected prior to move is not insured by ${companyname} and is the responsibility of the customer.&lt;br /&gt;
  4. ${companyname} shall in no way be responsible for the working condition of electronic equipment, grandfather clocks, or any other piece of mechanical&lt;br /&gt;
  equipment (MCU/Mechanical Condition Unknown). All items should be properly boxed and securely packed. If the following items are transported loosely, they are excluded from moving liability. These items include, but are not limited to: ELECTRONIC COMPONENTS, APPLIANCES, TELEVISIONS, STEREOS, DVD PLAYERS, CD/MP3 PLAYERS, SEWING MACHINES, TYPEWRITERS, COMPUTERS, PLANTS, LAMPSHADES, GLASS, CERAMIC LAMPS, CERAMIC ITEMS MIRRORS (WITH OR WITHOUT A DRILLED HOLE), MARBLE, CERAMIC, PLASTICS, CONCRETE PIECES, STATUES, PICTURES, PAINTINGS, CURTAIN RODS, COMPUTERS, LAPTOPS, DISHES, CHINA, ETC. Standard liability is limited to and not to exceed $0.60 cents per pound, per article.&amp;nbsp;&lt;br /&gt;
  5. ${companyname} will not repair or replace pressed board or simulated wood furniture. Much of the budget priced furniture today is made from a pressed wood or wood byproduct material. Some of the wood grain look is simply paper and some is very thin plastic material like on lower end kitchen cabinets. This type of material is not structurally strong, especially if it has screws, since the screw threads have no real grain to imbed into, just crumbly pressed wood chips held together by some binding agent. It is not repairable, and we have seen it crumble from the smallest vibrations riding in a truck across town. Do not EVEN ask us to repair or replace this type of furniture! We will do our best to move it successfully for you. This type of furniture is specifically excluded from basic and increased insurance coverage.&amp;nbsp;&lt;br /&gt;
  6. The right is reserved by ${companyname} to repair or replace any damaged item(s).&lt;br /&gt;
  7. ${companyname} will not be responsible for damage caused by non-routine moving including but not limited to, standing pieces on end, sharp turns, over-&lt;br /&gt;
  crowded work areas, difficult stairways, snags and sharp edges in work areas and doorways, handing over balconies, railings, etc., tight squeezes, and damage caused by weather. Occasionally it may not be possible to place items where you would like them without possible damage to the items or premises. If this situation arises, our foreman will present you with a release form indicating that you accept responsibility for any ensuing damage. (and/or obtain your verbal agreement). You will be asked to sign a waiver if we agree to attempt any non-routine moving request.&amp;nbsp;&lt;br /&gt;
  8. ${companyname} shall not be responsible for loss or damage to accounts, bills, checks, evidence of debts, letters of credit, passports, tickets, documents, manuscripts, notes, mechanical drawings, securities, currency, money, bullion, precious stones, jewelry, or other similar valuables, paintings, statuary, or other works of art; or property carried gratuitously or as an accommodation. The process of removing drawers must be done in the presence of the customer or their agent. We require that all valuables be place in a secure area off the premises prior to moving day. Example: (A vehicle or a family members or a friend&amp;rsquo;s residence.)&lt;br /&gt;
  9. ${companyname} shall not be responsible for damage resulting when moving household items that have deteriorated such as, but not limited to, lamp shades, mattresses, electrical wiring, etc.&amp;nbsp;&lt;br /&gt;
  10. ${companyname} shall not be responsible for glass in any form or damage resulting from glass breakage unless special packaging has been purchased. This applies to porcelain and ceramic items, also.&lt;br /&gt;
  11. ${companyname} shall not be responsible for plants or pets.&lt;br /&gt;
  12. ${companyname} may use dollies to facilitate removal or placement of appliances, etc., and damage that may result to soft floors, such as, but not limited to, indentation, scuff marks, etc., are not the responsibility of ${companyname}.&lt;br /&gt;
  13. ${companyname} shall not be responsible for damage to waterbeds or any subsequent damage. All waterbeds must be drained prior to move. &amp;nbsp;Any time needed to wait for customer to drain the water will be calculated at the service hourly rate.&lt;br /&gt;
  14. ${companyname} shall not be responsible for damage to items requiring special instructions if customer fails to provide such instructions including, but not limited to, disassembly or assembly of said items and any special preparation required. It is your responsibility to provide special tools if needed.&lt;br /&gt;
  15. ${companyname} assumes no liability or responsibility for any items and cargo placed in the customer&amp;#39;s own vehicle or in rental equipment and which ${companyname} does not transport.&lt;br /&gt;
  16. ${companyname} may use dollies to move heavy objects such as but not limited to pianos, appliances, items over 300 lb., etc. Any floor surfaces including but not limited to parquet, hardwood, ceramic, marble, entrance halls, etc. and any damage that may result to soft floors, such as, but not limited to, indentation, scuff marks, etc., are not the responsibility of ${companyname}. If floor can be pulled by thumbnail, we are not responsible for damage.&amp;nbsp;&lt;br /&gt;
  17. Water Connections. ${companyname} will not connect washer/dryer, or ice makers. Please note you or your representative must check or accept any plumbing connections. Please make sure the main water valve(s) are completely turned off before disconnecting them. Any assistance we give is as a courtesy only. Water and drain connections are the responsibility of the user. WE ARE NOT PLUMBERS.&amp;nbsp;&lt;br /&gt;
  18. ${companyname} cannot be responsible for the working condition of major appliances. Please note: if you are moving front/top load washer- you are responsible to arrange third party appliance technician who will install shipping bolts for your washer before moving it! We do not carry THEM! A good place to check for part numbers and availability is at your local appliance center. There is also a universal washing machine stabilization pack in the market that don&amp;#39;t use bolts but requires a bit more effort.&amp;nbsp;&lt;br /&gt;
  19. ${companyname} cannot be responsible for dents or scratches on major appliances. A thin metal that has an extreme affinity to dent and scratch covers them.&amp;nbsp;&lt;br /&gt;
  20. Ceilings. ${companyname} assumes no responsibility for ceilings.&amp;nbsp;&lt;/p&gt;
  `;

    let deposit_disclaimer = `All deposits or booking fees for moving services are non-refundable and will be applied to the final amount owed. If the service is cancelled or rescheduled, the deposit will be valid for up to one month, otherwise a new deposit will need to be required. The customer is responsible for any additional fees or charges incurred.`;

    let final_payment = `We thank you for choosing ${companyname} . We accept cash, money orders, company checks and credit/debit cards (3.5% processing fee on all electronic payments).  In the event of any payment processing issues (unless previously arranged with us ) Payment must be made and paid in full at the end of this moving service. `;

    let wavier_release_abiltiy = `Our number one goal at ${companyname} is to move all your belongings from point A to point B as safely and efficiently as possible. At time we are asked to performed task that no matter the precautions we take, the risk of certain items incurring damage is more likely. Unfortunately , we are not , and cant be responsible of these items. The items that we are referring to are listed below. we ask you to place your initials next to the items and then sign at the bottom. ${companyname} will still take all possible precautions to make sure all of  your items are moved as safely as possible.`;

    let wavier_risky_task = `${companyname} will not be responsible for any damage caused by non routine moving, including but not limited to :Sharp turns, over crowed work areas, tight squeezes, damage cause by weather . you will be asked to sign a waiver if we agree to attempt any non routine moving request.`;

    let wavier_damage = ` Damage incurred due to:<br>
  (1) the size of the item compared to the size of a wall, doorway, stairs, and elevator,<br>
  (2) TV's not properly pack or in Box or similar.<br>
  Movers will attempt to get the item in if you desire, but damage may result.`;

    let wavier_absent = `We encourage our Customers to be with us throughout the entire move. Whenever we move a piece of furniture we like to be able to point out any scratches, marks, or dings that you may not have noticed. If for some reason you are not able to be there for your move, or if you need to leave in the middle of the move, we need you to sign a release accepting all of the items in the condition that we bring them to you. We will not be responsible for any missing items, or damaged items. We will not be responsable for any of your items that were not moved.`;

    let wavier_disclaimer = `CUSTOMER HEREBY RELEASES ${companyname} AND ALL ITS CREAM MEMBER FROM LIABILITY ASSOCIATED WITH ANY OF THE ACTIVITIES DESCRIBED ABOVE AND INITIALED. CUSTOMER ASSUME REPONSABILITY FOR ALL OF THE ABOVE WHICH MAY OCCUR.`;

    let service_relase_comp = `I have inspected my goods and premises, including but not limited to elevators, floors, and stairwells. There are no damages except the one noted on the claim report . The Cab and back of the truck are empty and the job is completed.`;

    let service_cus_sign = `By signing this agreement, I agree that ${companyname} rendered and completed the services to my satisfaction, and I forfeit all rights to bring a claim or suit against ${companyname} for any damages.`;

    let claim_damage_rep = `${companyname}  will contact you within two business days to make arrangements to repair damages. Repair depend on vendor requirements. Please provide us with a phone number to contact you between 9:00am - 4:00pm weekdays. This constitutes my written damage claim.`;

    let data: any = {
      company_id: companyid,
      moving_policy,
      deposit_disclaimer,
      final_payment,
      wavier_release_abiltiy,
      wavier_risky_task,
      wavier_damage,
      wavier_absent,
      wavier_disclaimer,
      service_relase_comp,
      service_cus_sign,
      claim_damage_rep,
      claim: "",
      waiver: "",
      final_inspection: "",
    };

    await prismaClient.all_aggrement.create({
      data: data,
    });

    const emailTemplates: any[] = [
      {
        company_id: companyid,
        template: "default",
        greeting_text: "Your Moving QUOTE is ready !",
        middle_text:
          "<h1><strong>Dear *client_name*,</strong></h1><p>Your relocation estimate for&nbsp;*moving_date* at *moving_time* is ready ! *estimate_button*</p><p><strong>From:</strong> *lead_from_address*</p><p><strong>To:</strong> *lead_to_address*</p><p><strong>Travel distance of:&nbsp;</strong>*lead_distance*</p><p>We recommend *total_mover* men, and *total_trucks* truck(s)</p><p>Include in our rate,&nbsp;are:</p><ul><li><strong>Basic cargo insurance</strong></li><li><strong>Mileage &amp; fuel</strong></li><li><strong>Disassembly &amp; assembly</strong></li><li><strong>Full Furnitures protection&nbsp;</strong></li></ul><p>&nbsp;</p>",
        button_text: "View Estimate",
        button_link: "",
        button_bottom_text:
          "A deposit is required to book and confirm your move with us. This deposit will be applied towards your final invoice .",
        header_color: "",
        footer_color: "",
      },
      {
        company_id: companyid,
        template: "autoresponder",
        greeting_text: "We are ready to move you !!!",
        middle_text:
          "<h1>Hello, *client_name*,</h1><h2>Your quote number is *lead_estimate_no*</h2><p><strong>Our pricing structure is always simple and transparent.</strong></p><p><em><strong>We&nbsp; have a 3&nbsp;Hour&nbsp;minimum policy +&nbsp;material cost will&nbsp;be added on final&nbsp;invoice ( tape&nbsp;&amp; shrink wrap).</strong></em></p><ul><li>2 movers &amp; 1 truck = 1st TWO&nbsp;hour&nbsp;$275&nbsp;&amp;&nbsp;$95/hr for&nbsp;additional hours.</li><li>3 movers &amp; 1&nbsp;truck =&nbsp;1st TWO&nbsp;hour&nbsp;$345&nbsp;&amp;&nbsp;$120/hr for&nbsp;additional hours.</li><li>4 movers &amp; 2&nbsp;trucks =&nbsp;1st TWO&nbsp;hour&nbsp;$545&nbsp;&amp;&nbsp;$185/hr for&nbsp;additional hours.</li></ul>",
        button_text: "Update addresses &amp; Inventory",
        button_link: "",
        button_bottom_text:
          "Included in our rate are: *Basic Cargo Insurance *Mileage and Fuel *Disassembly &amp; assembly  **The pricing above is for standard local moves only. All long distance move will be priced in accordance of distance driven, fuel and dwelling size. NO HIDDEN,OR EXTRA FEES for stairs, long distance walking, narrow hallways.",
        header_color: "",
        footer_color: "",
      },
      {
        company_id: companyid,
        template: "movingreminder",
        greeting_text:
          "Your Moving reminder from Bantu Mover on *moving_date* *moving_time*",
        middle_text:
          "<p>We&nbsp;would like to extend our gratitude to you for choosing Bantu Mover with your relocation.</p><p>We know that you have several choices when it comes to service providers, and the fact that you chose us to help you with your move makes all the difference in the world.</p><p>&nbsp;please have all belongings packed and ready, including televisions properly boxed and appliances disconnected. Loose items, items not properly packed, TVs and electronics not in boxes will not be moved by our crew. Please disclose any item that weighs more than 200lbs and remove all clothes and items from dressers. Contact us if you need assistance with packing or if you need to make any changes to your appointment.&nbsp;</p><p>Again, thank you for choosing Bantu Mover for your moving needs.</p><p>If you have any questions, concerns, or comments, please do not hesitate to contact us.</p><p>Regards!</p>",
        button_text: "View your Moving details",
        button_link: "",
        button_bottom_text: "",
        header_color: "",
        footer_color: "",
      },
      {
        company_id: companyid,
        template: "review",
        greeting_text: "What Did You Think? Write a Review",
        middle_text:
          "<h1>Hello, *client_name*</h1><p>Could you take 60 seconds to leave us a review on google?</p><p>Online reviews from awesome clients like you help others feel confident about choosing Bantu Mover, and will helps us grow our business</p>",
        button_text: "Review us",
        button_link: "",
        button_bottom_text:
          "We value your input and use customer feedback to improve our services.",
        header_color: "",
        footer_color: "",
      },
      {
        company_id: companyid,
        template: "paymentrem",
        greeting_text: "Moving deposit Request",
        middle_text:
          "<h1>Hello, *client_name*</h1><p>Your *moving_size*&nbsp; is schedule to be moved on *moving_date* at *moving_time*</p>",
        button_text: "Pay Deposit",
        button_link: "",
        button_bottom_text:
          "** Please give us a call or text if you have any questions,we appreciate your business.",
        header_color: "",
        footer_color: "",
      },
      {
        company_id: companyid,
        template: "finalpem",
        greeting_text: "Final Moving invoice",
        middle_text:
          "<h1>Dear, *client_name*</h1><p>Thank you for your recent business with us. Clicking on the pay now button below , will redirect you to the&nbsp;payment portal&nbsp;</p>",
        button_text: "Pay Now",
        button_link: "",
        button_bottom_text:
          "If you have any question or concerns regarding this invoice, please dont hesitate to get in touch with us.",
        header_color: "",
        footer_color: "",
      },
    ];

    await prismaClient.tbl_email_templates.createMany({
      data: emailTemplates,
    });
    console.log("Data inserted successfully!");
  } catch (ex) {
    throw ex;
  }
};

/**
 * This function handles the login process for users. It expects a request object with the following properties:
 *
 * @param {TypedRequest<UserLoginCredentials>} req - The request object that includes user's email and password.
 * @param {Response} res - The response object that will be used to send the HTTP response.
 *
 * @returns {Response} Returns an HTTP response that includes one of the following:
 *   - A 400 BAD REQUEST status code and an error message if the request body is missing any required parameters.
 *   - A 401 UNAUTHORIZED status code if the user email does not exist in the database or the email is not verified or the password is incorrect.
 *   - A 200 OK status code and an access token if the login is successful and a new refresh token is stored in the database and a new refresh token cookie is set.
 *   - A 500 INTERNAL SERVER ERROR status code if there is an error in the server.
 */
export const handleLogin = async (
    req:TypedRequest<IUserRegister>,
    res: Response,
    next: NextFunction
  ) => {
  
    let { username, password } = req.body;
  
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required!' });
    }
  
    username = username.replace(/[&<>"']/g, (m) => {
      const char = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m];
      return char || '';
    });
  
    const user = await prismaClient.tbl_user.findFirst({
      where: { username: username }
    });
    if (!user) return res.status(400).json({message: "Incorrect username or password"});
    try {
      // Verify password
      const hashedPassword = require('crypto').createHash('md5').update(password + user.salt).digest('hex');
      if (user.password !== hashedPassword) {
        return res.status(400).json({message: "Incorrect username or password"});
      }
      // Log user access
      const now = new Date().toISOString();
      const IP = req.ip as string;
      const browser = req.headers['user-agent'] || '';
      if(user.company_id)
        await prismaClient.tbl_logs.create({
          data: {
            company_id: user.company_id ?? 0,
            time: now,
            IP: IP,
            browser: browser
          }
        });
  
      // Prepare user data to return
      const userData = {
        id: user.id,
        company_id: user.company_id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email_id: user.email_id,
        phone_no: user.phone_no,
        picture: user.picture,
        bio: user.bio,
        cover_photo: user.cover_photo,
        status: user.status,
        role: user.role,
        added_by: user.added_by,
        join_date: user.join_date
      };
  
      const accessToken = createAccessToken(userData.id,
        userData.username, userData.first_name, userData.last_name,
        userData.email_id, userData.added_by??0, userData.role, userData.company_id ?? 0);
  
      return res.json({ accessToken, userData });
    } catch (err) {
      next(err);
    }
  };