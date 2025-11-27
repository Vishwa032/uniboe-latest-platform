import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";

export default function Auth() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="mb-8 text-center">
        <Link href="/">
          <div className="flex items-center justify-center gap-2 cursor-pointer mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">U</span>
            </div>
          </div>
        </Link>
        <h1 className="text-2xl font-heading font-bold">Welcome to UniStay</h1>
        <p className="text-muted-foreground">The student housing platform</p>
      </div>

      <Card className="w-full max-w-md border-muted-foreground/20 shadow-lg">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Login or create a new account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="student@university.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full font-bold mt-4">Log In</Button>
              <div className="relative my-4">
                 <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                 <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline">Google</Button>
                 <Button variant="outline">Apple</Button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="student@university.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <div className="flex gap-4">
                   <Button variant="outline" className="flex-1 border-primary bg-primary/5 text-primary">Student</Button>
                   <Button variant="outline" className="flex-1">Landlord</Button>
                </div>
              </div>
              <Button className="w-full font-bold mt-4">Create Account</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
           <p className="text-xs text-muted-foreground text-center">
             By clicking continue, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
           </p>
        </CardFooter>
      </Card>
    </div>
  );
}
