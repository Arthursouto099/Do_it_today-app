import { Prisma } from "@prisma/client";
import { prisma } from "../libs/db";




export class BoardModel {

    async changeStatus(status: 'ATIVO' | 'COMPLETO' | 'DESATIVADO', id: number) {

        try {
            const boardUpdatedStatus = await prisma.board.update({
                where: {
                    id: id
                },
                data: {
                    status: status
                }
            })
    
            return {
                data: boardUpdatedStatus,
                ok: true
            }
        }

        catch(err: any) {
            return {
                ok: false
            }
        }
        
       
    }

    async getAllBoardsFromUserId(id: number) {
        try {
            const boards = await prisma.board.findMany({
                where: {
                    userId: id
                }
            })

            return {
                data: boards
            }
        }

        catch(error: any) {
            return {
                data: null
            }
        }
    }

    async getBoardById(id: number) {
        try {
            const board = await prisma.board.findFirst({where: {id: id}})
            const tasksByBord = await prisma.task.findMany({where: {boardId: id}})
            const taskDeletedByBoard = await prisma.taskDeleted.findMany({where: {boardId: id}}) 

            if(board!== undefined || board!== null) {
                return {
                    board,
                    tasksByBord,
                    taskDeletedByBoard
                }
            }
        }

        catch(err: any) {
            return {
                err: err.message
            }
        }
    }


    async createBoard(data: Prisma.BoardCreateInput) {
        try {
            const newBoard = await prisma.board.create({ data })
            return {
                data: newBoard,
                message: 'Board created',
                ok: true

            }
        }
        catch (err: any) {
            return {
                data: null,
                message: 'Board dont created, try again',
                ok: false

            }
        }

    }

    async updateBoard(data: Prisma.BoardCreateInput, id: number) {
        try {
            const updatUser = await prisma.board.update({
                where: {id},
                data
            })

            return {
                data: updatUser,
                ok: true,
                message: 'Board updated successfully'
            }
        }

        catch(err: any) {
            return {
                data: null, 
                ok: false,
                message: 'Error'
            }
        }
    }

    async deleteBoard(id: number) {
        try {
            const deletdTaskByIDboard = await prisma.task.deleteMany({
                where: {boardId: id}
            })

            const deleteTaskDeletedByIdBoard = await prisma.taskDeleted.deleteMany({
                where: {boardId: id}
            })

            const deletedBoard = await prisma.board.delete({
                where: {id: id}
            })

          

            return {
                ok: true
            }
        }

        catch(err: any) {
            return {
                ok: false
            }
        }
        
    } 
}