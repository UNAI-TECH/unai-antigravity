import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Events from "../pages/Events";
import { DataProvider } from "../context/DataContext";
import { BrowserRouter } from "react-router-dom";

// Mock the DataContext or provide a wrapper if needed
// For now, let's just check if it renders within the necessary providers

describe("Events Page Redesign", () => {
    it("renders the Global Collective heading", async () => {
        render(
            <BrowserRouter>
                <DataProvider>
                    <Events />
                </DataProvider>
            </BrowserRouter>
        );

        // Check for the new premium heading text
        expect(screen.getByText(/Global/i)).toBeDefined();
        expect(screen.getByText(/Collective/i)).toBeDefined();
    });

    it("renders the Engineering Communities badge", () => {
        render(
            <BrowserRouter>
                <DataProvider>
                    <Events />
                </DataProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/Engineering Communities/i)).toBeDefined();
    });
});
