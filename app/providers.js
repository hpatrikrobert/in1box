"use client";

const { createContext, useState, useEffect } = require("react");

// Mailboxes Context
export const Mailbox_Context = createContext(null);

const getMailboxes = async () => {
    try {
        const mailboxes = await fetch("http://localhost:3000/api/mailbox/", { cache: "no-store" });
        return mailboxes.json();
    } catch (error) {
        console.log(error);
    }
};

// Email context
export const Email_Context = createContext(null);

const getEmails = async () => {
    try {
        const emails = await fetch("http://localhost:3000/api/emails/", { cache: "no-store" });
        return emails.json();
    } catch (error) {
        console.log(error);
    }
};

export default function Providers({ children }) {
    const [mailboxes, setMailboxes] = useState([]);
    const [selectedMailbox, setSelectedMailbox] = useState("");
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { mailboxes } = await getMailboxes();
            setMailboxes(mailboxes);
            const { emails } = await getEmails();
            // if selectedMailbox is truthy, filter the emails to show only the emails where the sender has the correct email
            if (selectedMailbox) {
                const filteredEmails = emails.filter((email) => email.sender === selectedMailbox.address);
                setEmails(filteredEmails);
            } else {
                setEmails(emails);
            }
        }
        fetchData();
    }, [selectedMailbox]);


    return (
        <Mailbox_Context.Provider value={{ mailboxes, setMailboxes, selectedMailbox, setSelectedMailbox }}>
            <Email_Context.Provider value={{ emails }}>
                {children}
            </Email_Context.Provider>
        </Mailbox_Context.Provider>
    );
}