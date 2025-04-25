import { TRPCError } from '@trpc/server'
import { createTRPCRouter, publicProcedure } from './init'
import type { TRPCRouterRecord } from '@trpc/server'
// import { z } from 'zod'


const peopleRouter = {
  list: publicProcedure.query(async () =>
    fetch('https://swapi.dev/api/people')
      .then((res) => res.json())
      .then((d) => d.results as Array<{ name: string }>),
  ),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  people: peopleRouter,
})
export type TRPCRouter = typeof trpcRouter
