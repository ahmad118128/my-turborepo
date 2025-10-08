import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["button", "submit", "reset"],
    },
    children: { control: "text" },
    style: { control: "object" },
    onClick: { action: "clicked" }, // میاد اتوماتیک اکشن رو تو Actions tab می‌فرسته
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ---------- Stories ----------
export const Primary: Story = {
  args: {
    children: "Primary Button",
    type: "button",
    style: {
      backgroundColor: "#1d4ed8",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: 6,
      cursor: "pointer",
    },
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    type: "button",
    style: {
      backgroundColor: "#f3f4f6",
      color: "#1f2937",
      border: "1px solid #9ca3af",
      padding: "8px 16px",
      borderRadius: 6,
      cursor: "pointer",
    },
  },
};

export const WithClickAction: Story = {
  args: {
    children: "Click Me",
    type: "button",
    style: {
      backgroundColor: "#10b981",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: 6,
      cursor: "pointer",
    },
    onClick: () => alert("Hello from Turborepo! 🚀"),
  },
};
