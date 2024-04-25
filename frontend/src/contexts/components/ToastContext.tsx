"use client";

import React, { createContext } from "react";
import { ToastContextType } from "~/types/contexts/ToastContextType";

const ToastContext = createContext<ToastContextType>(null!);

export default ToastContext;
