import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ship, Lock, Mail, ArrowRight, Globe } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Utilisation de notre hook React Query
  const { login, isLoggingIn } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-12">
      <div className="flex flex-col justify-between p-8 lg:col-span-5 xl:col-span-4 bg-background">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
            <Ship className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-foreground">MarcoTrans</span>
        </div>

        <div className="w-full max-w-sm mx-auto my-auto py-12">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Portail Logistique
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Connectez-vous pour gérer vos expéditions et flux
                internationaux.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nom@marcotrans.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoggingIn}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <a
                      href="#"
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoggingIn}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-2 font-medium"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Authentification..." : "Accéder au dashboard"}
                  {!isLoggingIn && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-xs text-muted-foreground lg:text-left">
          &copy; {new Date().getFullYear()} MarcoTrans International. Tous
          droits réservés.
        </div>
      </div>

      <div className="hidden lg:flex lg:col-span-7 xl:col-span-8 bg-muted relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 opacity-95 z-0" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] z-0" />

        <div className="relative z-10 max-w-xl text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
            <Globe className="w-3.5 h-3.5" /> Suivi de fret en temps réel
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight xl:text-5xl">
            Pilotez votre chaîne logistique globale en un clic.
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Accédez à la plateforme de supervision MarcoTrans. Suivez vos
            conteneurs maritimes, gérez les douanes et optimisez vos trajets de
            fret routier et aérien.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
            <div>
              <div className="text-2xl font-bold text-white">150+</div>
              <div className="text-xs text-slate-400 mt-1">Pays desservis</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-slate-400 mt-1">
                Support douanier
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">&lt; 1.2%</div>
              <div className="text-xs text-slate-400 mt-1">Taux d'anomalie</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
