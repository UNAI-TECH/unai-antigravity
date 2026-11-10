import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Events from "../pages/Events";
import { DataProvider } from "../context/DataContext";
import { BrowserRouter } from "react-router-dom";

// Mock the DataContext or provide a wrapper if needed
// For now, let's just check if it renders within the necessary providers

describe("Events Page", () => {
    it("renders the Events heading", async () => {
        render(
            <BrowserRouter>
                <DataProvider>
                    <Events />
                </DataProvider>
            </BrowserRouter>
        );

        expect(screen.getAllByText(/EVENTS/i).length).toBeGreaterThan(0);
    });

    it("renders the UNAI TECH Live Events badge", () => {
        render(
            <BrowserRouter>
                <DataProvider>
                    <Events />
                </DataProvider>
            </BrowserRouter>
        );

        expect(screen.getAllByText(/UNAI TECH — Live Events/i).length).toBeGreaterThan(0);
    });
});
