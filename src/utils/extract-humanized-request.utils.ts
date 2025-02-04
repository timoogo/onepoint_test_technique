import { FastifyRequest } from "fastify";
import { HumanizedRequest } from "../types/request.humanised.type";

export function extractHumanizedRequest(
    request: FastifyRequest, 
    omitFields: Array<keyof HumanizedRequest> = []
  ): Partial<HumanizedRequest> {
    const fullRequest: HumanizedRequest = {
      id: request.id,
      method: request.method,
      url: request.url,
      params: request.params as Record<string, any>,
      query: request.query as Record<string, any>,
      headers: request.headers,
      body: request.body,
      user: request.user,
      cookies: "cookies" in request ? (request.cookies as Record<string, any>) : undefined,
      connection: "connection" in request ? (request.connection as Record<string, any>) : undefined,
    };
  
    // Supprimer les cookies des headers si `cookies` est dans `omitFields`
    if (omitFields.includes("cookies")) {
      delete fullRequest.headers?.cookie;
    }
  
    return Object.fromEntries(
      Object.entries(fullRequest).filter(([key]) => !omitFields.includes(key as keyof HumanizedRequest))
    ) as Partial<HumanizedRequest>;
  }
  