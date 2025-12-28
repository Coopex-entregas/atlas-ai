-- Create customers table for additional customer info
CREATE TABLE public.customers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    phone TEXT NOT NULL,
    default_address TEXT,
    default_neighborhood TEXT,
    default_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- Create orders table
CREATE TABLE public.orders (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    pickup_address TEXT NOT NULL,
    pickup_neighborhood TEXT NOT NULL,
    pickup_number TEXT NOT NULL,
    pickup_contact_name TEXT NOT NULL,
    pickup_contact_phone TEXT,
    delivery_address TEXT NOT NULL,
    delivery_neighborhood TEXT NOT NULL,
    delivery_number TEXT NOT NULL,
    delivery_contact_name TEXT NOT NULL,
    delivery_contact_phone TEXT,
    service_type TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_stops table for intermediate stops
CREATE TABLE public.order_stops (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    stop_order INTEGER NOT NULL,
    address TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    number TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    contact_phone TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_stops ENABLE ROW LEVEL SECURITY;

-- Customers policies
CREATE POLICY "Users can view their own customer profile"
ON public.customers FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own customer profile"
ON public.customers FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customer profile"
ON public.customers FOR UPDATE
USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view their own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders"
ON public.orders FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
ON public.orders FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update all orders"
ON public.orders FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Order stops policies
CREATE POLICY "Users can view stops of their orders"
ON public.order_stops FOR SELECT
USING (EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_stops.order_id
    AND orders.user_id = auth.uid()
));

CREATE POLICY "Users can create stops for their orders"
ON public.order_stops FOR INSERT
WITH CHECK (EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_stops.order_id
    AND orders.user_id = auth.uid()
));

CREATE POLICY "Users can delete stops from their orders"
ON public.order_stops FOR DELETE
USING (EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_stops.order_id
    AND orders.user_id = auth.uid()
));

CREATE POLICY "Admins can view all order stops"
ON public.order_stops FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();