import { AgentInfo } from "./agentInfo";
import { Record } from "./record";

export interface Root {
    agentInfo: AgentInfo;
    records: Record[] | [];
    showContactInfo: boolean;
    role: string;
    title: string;
    body: string;
}


