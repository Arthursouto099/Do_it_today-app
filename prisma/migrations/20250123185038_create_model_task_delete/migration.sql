-- CreateTable
CREATE TABLE "TaskDeleted" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "finalDate" TEXT NOT NULL,
    "priority" "Priority" NOT NULL,
    "boardId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskDeleted_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskDeleted" ADD CONSTRAINT "TaskDeleted_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskDeleted" ADD CONSTRAINT "TaskDeleted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
