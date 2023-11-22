"use client";

import { createContext, useState, useEffect } from "react";
import { SessionProvider, getSession } from "next-auth/react";
import email from "@/interfaces/email_Interface";
import mbInterface from "@/interfaces/mb_interface";

export interface props {
    children: string,
}

interface Email_Context {
    emails: email[]
}

interface Mailbox_Context {
    mailboxes: mbInterface[];
    selectedMailbox: {id: string, address: string};
    setMailboxes: React.Dispatch<React.SetStateAction<never[]>>
    setSelectedMailbox: React.Dispatch<React.SetStateAction<{ id: string; address: string }>>
}

// Mailboxes Context
export const Mailbox_Context = createContext<Mailbox_Context | null>(null);

const getMailboxes = async () => {
    try {
        const mailboxes = await fetch("http://localhost:3000/api/mailbox/", { cache: "no-store" });
        return mailboxes.json();
    } catch (error) {
        console.log(error);
    }
};

// Email context
export const Email_Context = createContext<Email_Context | null>(null);

const getEmails = async () => {
    try {
        const emails = await fetch("http://localhost:3000/api/emails/", { cache: "no-store" });
        
        return emails.json();
    } catch (error) {
        console.log(error);
    }
};

export default function Providers({ children }: props) {
    const [mailboxes, setMailboxes] = useState([]);
    const [selectedMailbox, setSelectedMailbox] = useState({ id: "", address: "" });
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const sessionID = await getSession();
            const { mailboxes } = await getMailboxes();
            setMailboxes(mailboxes);
            const filteredMBs = mailboxes.filter((mb: mbInterface) => mb.user_id === sessionID?.user?.email);
            setMailboxes(filteredMBs);
            // console.log("FilteredMB", filteredMBs);
            const { emails } = await getEmails();
            // if selectedMailbox is truthy, filter the emails to show only the emails where the sender has the correct email
            if (selectedMailbox.address) {
                const filteredEmails = emails.filter((email: email) => email.sender === selectedMailbox.address);
                setEmails(filteredEmails);
            }
        }
        fetchData();
    }, [selectedMailbox]);


    return (
        <SessionProvider>
            <Mailbox_Context.Provider value={{ mailboxes, setMailboxes, selectedMailbox, setSelectedMailbox }}>
                <Email_Context.Provider value={{ emails }}>
                    {children}
                </Email_Context.Provider>
            </Mailbox_Context.Provider>
        </SessionProvider>
    );
}