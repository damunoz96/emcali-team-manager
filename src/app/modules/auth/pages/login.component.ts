import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login-page',
  template: `
  <div class="min-h-screen bg-background pt-14">
    <main class="container mx-auto px-4 lg:px-8 py-12">
      <div class="max-w-md mx-auto">
        <div class="bg-card rounded-lg border border-border shadow-card p-8">
          <!-- Logo Icon -->
          <div class="flex items-center justify-center mb-6">
            <div
              class="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </div>
          </div>

          <!-- Title -->
          <h1 class="text-2xl font-bold text-foreground text-center mb-2">Welcome Back</h1>
          <p class="text-muted-foreground text-center mb-8">Sign in to your account to continue</p>

          <!-- Login Form -->
          <form class="space-y-6">
            <!-- Email Input -->
            <div>
              <label for="email" class="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>

            <!-- Password Input -->
            <div>
              <label for="password" class="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign In
            </button>
          </form>

          <!-- Signup Link -->
          <div class="mt-6 text-center">
            <p class="text-sm text-muted-foreground">
              Don't have an account?
              <a routerLink="/auth/signup" class="text-primary hover:underline font-medium cursor-pointer"> Sign up </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
  `,
  imports: [RouterLink],
})
export class LoginComponent {}
