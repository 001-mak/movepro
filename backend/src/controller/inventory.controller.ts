import {Request,Response} from 'express'
import prismaClient from '../config/prisma'
import httpStatus from 'http-status'
import type {
    InventoryGroup,
    PagedQuery,
    TypedRequest,
}from '../interface/interface'

